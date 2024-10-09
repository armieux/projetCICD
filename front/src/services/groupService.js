import apiService from './apiService';

const groupService = {
    async createGroup() {
        try {
            const newGroup = await apiService.createGroup();
            return newGroup;
        } catch (error) {
            throw error;
        }
    },

    async getGroups() {
        try {
            const groups = await apiService.fetchGroups();
            return groups;
        } catch (error) {
            throw error;
        }
    },

    async addUserToGroup(userId, groupId) {
        try {
            await apiService.addUserToGroup(userId, groupId);
        } catch (error) {
            throw error;
        }
    },

    async removeUserFromGroup(userId, groupId) {
        try {
            await apiService.removeUserFromGroup(userId, groupId);
        } catch (error) {
            throw error;
        }
    },

    // If you have an API endpoint to delete a group, you can implement it here
    async deleteGroup(groupId) {
        try {
            await apiService.deleteGroup(groupId);
        } catch (error) {
            throw error;
        }
    },

    async respondToInvitation(inviteId, userId) {
        try {
            await apiService.respondToInvitation(inviteId, userId);
        } catch (error) {
            throw error;
        }
    },
};

export default groupService;