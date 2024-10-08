import userService from './../../src/services/userService';

describe('userService', () => {
    it('should create a user', () => {
        const user = userService.createUser();
        expect(user).toHaveProperty('id');
        expect(user.group).toBeNull();
    });

    it('should get all users without a group', () => {
        userService.createUser(); // Assuming this user has no group
        const usersWithoutGroup = userService.getUsersWithoutGroup();
        expect(usersWithoutGroup.every(user => user.group === null)).toBe(true);
    });
});