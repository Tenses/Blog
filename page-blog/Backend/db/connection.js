const Sequelize = require("sequelize");
const path = "mysql://root@localhost:3306/page-blog";
const sequelize = new Sequelize(path, { operatorAliases: false });

sequelize.authenticate()
    .then(() => {
        console.log("Conectado: Page-Blog base de datos");
    })
    .catch(err => {
        console.error("Error de conexión:", err)
    })


module.exports = sequelize;
