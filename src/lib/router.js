const { EventEmitter } = require('events');

class Router extends EventEmitter {
    constructor(prefix = '') {
        super();
        this.prefix = prefix;
        this.routes = {};
        this.middlewares = [];
        ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(m => {
            this.routes[m] = {};
        });
    }

    use(func) {
        if (typeof func === 'function') {
            this.middlewares.push(func);
        }
        return this;
    }

    use(...args) {
        if (args[0] instanceof Router) {
            const subRouter = args[0];
            const pathPrefix = args[1] || '';

            this.middlewares.push(async (req, res, next) => {
                const originalPath = req.path;
                const subPath = req.path.replace(new RegExp(`^${this.prefix}${pathPrefix}`), '') || '/';

                if (subPath !== req.path) {
                    req.path = subPath;
                    await subRouter._handle(req, res);
                    req.path = originalPath;
                }
                next();
            });
            return this;
        }

        if (typeof args[0] === 'function') {
            this.middlewares.push(args[0]);
        } else if (typeof args[1] === 'function') {
            const [path, handler] = args;
            this.middlewares.push((req, res, next) => {
                if (req.path.startsWith(path)) {
                    const originalPath = req.path;
                    req.path = req.path.replace(path, '') || '/';
                    handler(req, res, () => {
                        req.path = originalPath;
                        next();
                    });
                } else {
                    next();
                }
            });
        }
        return this;
    }

    _registerMethod(method) {
        return (path, ...handlers) => {
            const normalized = this._normalizePath(path);
            this.routes[method][normalized] = handlers;
            this.emit('route', { method, path: normalized });
        };
    }

    _normalizePath(path) {
        return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
    }

    async _handle(req, res) {
        try {
            await this._runMiddlewares(req, res);
            const route = this._findRoute(req.method, req.path);

            if (route) {
                req.params = route.params;
                await this._execHandlers(route.handlers, req, res);
            } else {
                res.status(404).json({ error: 'Not Found' });
            }
        } catch (err) {
            throw err;
        }
    }

    handle() {
        return async (req, res, next) => {
            try {
                await this._handle(req, res);
            } catch (err) {
                next(err);
            }
        };
    }

    async _runMiddlewares(req, res, idx = 0) {
        if (idx < this.middlewares.length) {
            await this.middlewares[idx](req, res, () => {
                this._runMiddlewares(req, res, idx + 1);
            });
        }
    }

    _findRoute(method, path) {
        const routes = this.routes[method] || {};
        const cleanPath = this._normalizePath(path);

        for (const [routePath, handlers] of Object.entries(routes)) {
            const params = {};
            const regex = new RegExp(
                '^' + routePath.replace(/\/:(\w+)/g, (_, name) => {
                    params[name] = `(?<${name}>[^/]+)`;
                    return `/([^/]+)`;
                }) + '/?$'
            );

            const match = cleanPath.match(regex);
            if (match) {
                const paramValues = match.groups || {};
                for (const [key, value] of Object.entries(paramValues)) {
                    params[key] = value;
                }
                return { handlers, params };
            }
        }
        return null;
    }

    async _execHandlers(handlers, req, res, idx = 0) {
        if (idx < handlers.length) {
            await handlers[idx](req, res, () => {
                this._execHandlers(handlers, req, res, idx + 1);
            });
        }
    }
}

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
    Router.prototype[method] = function (path, ...handlers) {
        this._registerMethod(method.toUpperCase())(path, ...handlers);
        return this;
    };
});

module.exports = Router;