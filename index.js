const express = require("express");
const boryParser = require("body-parser");
const connection = require("./databases/database");
const Game = require("./models/Game");

const app = express();
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


app.get("/games", (req, res) => {
    Game.findAll({ raw: true }).then(games => {
        res.status(200).json(games);
    }).catch(err => {
        console.log(err);
    })
});

app.get("/games/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if(!isNaN(id)){
        Game.findOne({ where: { id: id}}).then(game => {
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

app.delete("/games/:id", (req, res) => {
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

app.put("/games/:id", (req, res) => {
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