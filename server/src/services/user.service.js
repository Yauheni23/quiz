const UserRepository = require('../repositories/user.repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    getAll(filter = {}) {
        return this.userRepository.getAll(filter);
    }

    create(data) {
        return this.userRepository.create({
            name: data.name,
            result: data.result || 0,
        })
    }

    update(data, options) {
        return this.userRepository.update(data, options)
    }
}

module.exports = UserService;
