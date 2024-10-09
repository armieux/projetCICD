import apiService from './apiService';

const userService = {
    async createUser(userData) {
        // Use apiService to create a new user
        return await apiService.createUser(userData);
    },

    async getUsersWithoutGroup() {
        // Fetch all users and filter those without a group on the client side
        // Alternatively, you could implement a specific endpoint in your backend to fetch users without a group
        const users = await apiService.fetchUsers();
        return users.filter(user => user.group === null);
    },

    async getAllUsers() {
        // Use apiService to fetch all users
        return await apiService.fetchUsers();
    },

    async loginUser(email) {
        console.log(email);
        // Use apiService to login the user
        return await apiService.loginUser(email);
    }
};

export default userService;