const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: '0.0.0.0/0',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

const CurrencyShop = require('./Models/CurrencyShop')(sequelize, Sequelize.DataTypes)
const UserItem = require('./Models/UserItem')(sequelize, Sequelize.DataTypes)
const Users = require('./Models/Users')(sequelize, Sequelize.DataTypes)

UserItem.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' })

Reflect.defineProperty(Users.prototype, 'addItem', {
    value: async item => {
        const userItem = await UserItem.findOne({
            where: { user_id: this.user_id, item_id: this.item_id },
        })

        if (userItem) {
            userItem.amount++
            
            return userItem.save()
        }

        return UserItem.create({ user_id})
    },
})

Reflect.defineProperty(Users.prototype, 'getItems', {
    value: () => {
        return UserItem.findAll({
            where: { user_id: this.user_id },
            include: ['item']
        })
    },
})