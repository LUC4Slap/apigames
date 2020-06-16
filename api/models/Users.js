const Sequelize = require("sequelize");
const connection = require("../databases/database");

const Users = connection.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confirPassword: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Users.sync();

module.exports = Users;