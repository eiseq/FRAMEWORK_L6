const { URL } = require('url');

class Request {
    constructor(req) {
        this.originalReq = req;
        this.method = req.method.toUpperCase();
        this.url = req.url;
        this.headers = req.headers;
        this.body = null;
        this.params = {};
        this.query = {};
        this._parseUrl();
    }

    _parseUrl() {
        try {
            const base = `http://${this.headers.host || 'localhost'}`;
            const urlObj = new URL(this.url, base);

            this.path = urlObj.pathname.replace(/\/+$/, '') || '/';
            this.query = Object.fromEntries(urlObj.searchParams);
        } catch {
            const [path] = this.url.split('?');
            this.path = path || '/';
            this.query = {};
        }
    }
}

module.exports = Request;