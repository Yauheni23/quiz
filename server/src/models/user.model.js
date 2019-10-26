module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING,
        },
        result: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return User;
};
