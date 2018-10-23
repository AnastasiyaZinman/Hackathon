const Sequelize = require('sequelize');
const sequelize = require('../dataAccess/da');
const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
name: {
    type: Sequelize.STRING,
    notNull: true
},
password: {
    type: Sequelize.STRING,
    notNull: true
}
},
{
    timestamps: false
});
const Record = sequelize.define('Record', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    userId: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    date: {
        type: Sequelize.STRING,
        notNull: true
    },
    type: {
        type: Sequelize.STRING,
        notNull: true
    },
    category: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    payment: {
        type: Sequelize.SMALLINT,
        notNull: true
    },
    amount: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    currency: {
        type: Sequelize.STRING,
        notNull: true
    },
    comment: {
        type: Sequelize.STRING
    },
    });

User.hasMany(Record, {foreignKey: 'userId', sourceKey: 'id' });
module.exports = {User : User, Record : Record};

