const User = require('../config/db.config').User;

const defaultOptions = {
    attributes: ['id', 'name', 'result']
};

class UserRepository {
    getAll(filter) {
        return User.findAll({
            ...filter,
            ...defaultOptions
        });
    }

    create(data) {
        return User.create(data);
    }

    update(data, options) {
        return User.update(data, options);
    }
}

module.exports = UserRepository;
