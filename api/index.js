const express = require("express");
const boryParser = require("body-parser");
const connection = require("./databases/database");
const Game = require("./models/Game");
const Users = require("./models/Users");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
require('dotenv/config')

const JWTSecret = process.env.KEY_TOKEN
// const JWTSecret = "hfdkjhqwiuehksnckhsdifuhsdi"
const app = express();
app.use(cors());
app.use(boryParser.urlencoded({ extended: false }));
app.use(boryParser.json());

connection
    .authenticate()
    .then(() => {
        console.log("Conexão estabelecida com sucesso: arquivo -> index.js");
    })
    .catch(err => {
        console.log(err);
    })


app.post('/auth', (req, res) => {
    let { email, password } = req.body;
    if(email == undefined) {
        res.status(400).json({ message: 'Informe um email' });
    } else if(password == undefined) {
        res.status(400).json({ message: 'Informe sua senha' });
    }else {
        Users.findOne({ where: { email: email }}).then(user => {
            if(user && user.password === password) {
                jwt.sign({ id: user.id, email: user.email}, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if(err) {
                        res.json({ message: 'Erro para gerar Token' })
                    } else {
                        console.log(token);
                        res.status(200).json({ token: token });
                    }
                });
            }else {
                res.status(401).json({ message: 'Credenciais Invalidas' });
            }
        }).catch(err => {
            res.json(err);
        })
    }
});

app.post('/users', auth, (req, res) => {
    let { name, email, password, confirPassword } = req.body;
    if(password === confirPassword) {
        Users.create({ name, email, password, confirPassword }).then(user => {
            res.status(200).json(user);
        }).catch(err => {
            res.json(err);
        })
    }else {
        res.json({ message: 'Senhas não conferem' });
    }
});

app.get("/games", auth, (req, res) => {
    let user = req.loggedUser;
    console.log(user);
    Game.findAll({ raw: true }).then(games => {
        console.log(req.loggedUser);
        res.status(200).json(games);
    }).catch(err => {
        console.log(err);
    })
});

app.get("/games/:id",auth, (req, res) => {
    let id = parseInt(req.params.id);
    if(!isNaN(id)){
        Game.findOne({ where: { id: id }}).then(game => {
            res.status(200).json(game);
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.status(400).json({ massage: 'Erro ao recuperar game!' })
    }
});

app.post("/games", (req, res) => {
    let title = req.body.title;
    let year = req.body.year;
    let price = req.body.price;
    Game.create({
        title,
        year,
        price
    }).then(game => {
        res.status(200).json(game)
    }).catch(err => {
        res.status(400).json(err);
    })
});

app.delete("/games/:id",auth, (req, res) => {
    let id = parseInt(req.params.id);
    if(!isNaN(id) && id != undefined) {
        Game.destroy({ where: { id: id }}).then(() => {
            res.status(200).json({ message: 'Exclido com sucesso!' });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        })
    }
});

app.put("/games/:id",auth, (req, res) => {
    let id = parseInt(req.params.id);
    let title = req.body.title;
    let year = req.body.year;
    let price = req.body.price;
    Game.update({ title, year, price }, { where: { id: id }}).then(() => {
        res.status(200).json({ message: "Atualizado com Sucesso!" });
    }).catch(err => {
        console.log(err);
        res.status(400).json({ message: err });
    })
})


app.listen(8080, () => {
    console.log("API ON");
})