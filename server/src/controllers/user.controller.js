const UserService = require('../services/user.service');

const userService = new UserService();

module.exports = function(app) {
    app.route('/user')
        .get(getUsers)
        .post(createUser);
    app.route('/user/:id')
        .post(updateResult)
};

function getUsers(request, response) {
    userService.getAll()
        .then(users => response.send(users))
        .catch(error => response.status(500).send(error));
}

function createUser(request, response) {
    userService.create(request.body)
        .then(user => response.send({
            id: user.id,
            name: user.name,
        }))
        .catch(error => response.status(400).send(error));
}

function updateResult(request, response) {
    userService.update({
        result: request.body.result
    }, {
        where: {
            id: request.params.id
        }
    })
    .then(user => response.send(user))
    .catch(error => response.status(500).send(error));
}
