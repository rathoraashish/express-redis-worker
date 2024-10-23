const users = require('../data/users.json').users;

class User {
  static async findAll() {
    return users;
  }

  static async findById(id) {
    return users.find(user => user.id === id);
  }
}

module.exports = User;