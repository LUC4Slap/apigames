const jwt = require('jsonwebtoken');
// Middlewares sempre prescisam de 3 parametros, req = requisição
// res = resposta e next = proximo
function auth(req, res, next) {
    // const authToken = req.headers['autorization'];
    const authToken = req.headers['authorization'];
    if(authToken != undefined) {
        let bear = authToken.split(' ');
        let token = bear[1];
        jwt.verify(token, process.env.KEY_TOKEN, (err, data) => {
            if(err) {
                res.status(401).json({ error: err })
            } else {
                req.token = token;
                req.loggedUser = { id: data.id, user: data.email };
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Token invalid" })
    }
}

module.exports = auth;