const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: '0.0.0.0/0',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

// Database Model   
/** 
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
*/
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true.valueOf,
    },
    description: Sequelize.TEXT,        
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
})

module.exports = {
    Tags,
}