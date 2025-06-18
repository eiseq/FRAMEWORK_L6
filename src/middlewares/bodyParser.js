const bodyParser = async (req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        try {
            let body = '';
            for await (const chunk of req.originalReq) {
                body += chunk.toString();
            }
            if (body) {
                req.body = JSON.parse(body);
            }
        } catch (err) {
            res.status(400).json({ error: 'Bad Request' });
            return;
        }
    }
    next();
};

module.exports = bodyParser;