module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
        },
        rating: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return User;
};
