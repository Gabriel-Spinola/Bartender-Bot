const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password', {
    host: '0.0.0.0/0',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

const CurrencyShop = require('./Models/CurrencyShop')(sequelize, Sequelize.DataTypes)
require('./Models/UserItem')(sequelize, Sequelize.DataTypes)
require('./Models/Users')(sequelize, Sequelize.DataTypes)

const force = process.argv.includes('--force') || process.argv.includes('-f')

sequelize.sync({ force }).then(async () => {
    const shop = [
        // upsert: avoid creating duplicates if you run this file multiple times
        CurrencyShop.upsert({ name: 'Tea', cost: 1 }),
        CurrencyShop.upsert({ name: 'Coffe', cost: 2 }),
        CurrencyShop.upsert({ name: 'Cake', cost: 5 })
    ]

    await Promise.all(shop)
    console.log('Database synced')

    sequelize.close()
}).catch(console.error)
