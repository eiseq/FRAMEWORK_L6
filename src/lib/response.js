class Response {
    constructor(res) {
        this.originalRes = res;
        this.statusCode = 200;
        this.headers = {};
    }

    status(code) {
        if (Number.isInteger(code)) {
            this.statusCode = code;
        }
        return this;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    send(data) {
        if (typeof data === 'object' && !Buffer.isBuffer(data)) {
            return this.json(data);
        }
        this._send(data);
    }

    json(data) {
        this.setHeader('Content-Type', 'application/json');
        this._send(JSON.stringify(data));
    }

    _send(data) {
        if (!this.originalRes.headersSent) {
            this.originalRes.writeHead(this.statusCode, this.headers);
            this.originalRes.end(data);
        }
    }
}

module.exports = Response;