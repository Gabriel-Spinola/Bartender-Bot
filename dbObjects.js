const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('.models/CurrencyShop.js')(sequelize, sequelize.DataTypes)
const UserItems = require('./Models/UserItems.js')(sequelize, sequelize.DataTypes)
const Users = require('./Models/Users.js')(sequelize, sequelize.DataTypes)

UserItems.belongsTo(CurrencyShop, { foreignKey: 'item_id', as: 'item' })

Reflect.defineProperty(Users.prototype, 'addItem', {
    value: async item => {
        const userItem = await UserItems.findOne({
            where: { user_id: this.user_id, item_id: this.item_id },
        })

        if (userItem) {
            userItem.amount++;
            
            return userItem.save()
        }

        return UserItems.create({ user_id})
    },
})

Reflect.defineProperty(Users.prototype, 'getItems', {
    value: () => {
        return UserItems.findAll({
            where: { user_id: this.user_id },
            include: ['item']
        })
    },
})