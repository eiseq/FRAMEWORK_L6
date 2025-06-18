const http = require('http');
const Request = require('./request');
const Response = require('./response');
const Router = require('./router');

class Application {
    constructor() {
        this.router = new Router();
        this.server = null;
        this.errorMiddleware = null;
    }

    onError(handler) {
        this.errorMiddleware = handler;
        return this;
    }

    async _handleRequest(req, res) {
        const request = new Request(req);
        const response = new Response(res);

        try {
            await this.router._handle(request, response);
        } catch (err) {
            if (this.errorMiddleware) {
                this.errorMiddleware(err, request, response);
            } else {
                response.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    listen(port, cb) {
        this.server = http.createServer(this._handleRequest.bind(this));
        this.server.listen(port, cb);
        return this;
    }

    use(middleware) {
        this.router.use(middleware);
        return this;
    }
}

['get', 'post', 'put', 'patch', 'delete'].forEach(method => {
    Application.prototype[method] = function (...args) {
        this.router[method](...args);
        return this;
    };
});

module.exports = Application;