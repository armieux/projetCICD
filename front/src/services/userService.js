let users = [];
let nextUserId = 1;

const userService = {
    createUser() {
        const newUser = { id: `user${nextUserId++}`, group: null };
        users.push(newUser);
        return newUser;
    },

    getUsersWithoutGroup() {
        return users.filter(user => user.group === null);
    },

    getAllUsers() {
        return users;
    }
};

export default userService;