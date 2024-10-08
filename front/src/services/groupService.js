import Group from '../models/Group';

let groups = [];
let nextGroupId = 1;

const groupService = {
    createGroup() {
        const newGroup = new Group(nextGroupId++);
        groups.push(newGroup);
        return newGroup;
    },

    getGroups() {
        return groups;
    },

    addUserToGroup(userId, groupId) {
        const group = groups.find(g => g.id === groupId);
        const user = { id: userId, group: groupId }; // Static user
        if (group) {
            group.addMember(user);
        }
    },

    removeUserFromGroup(userId, groupId) {
        const group = groups.find(g => g.id === groupId);
        const user = { id: userId }; // Static user
        if (group) {
            group.removeMember(user);
        }
    },

    deleteGroup(groupId) {
        groups = groups.filter(group => group.id !== groupId);
    }
};

export default groupService;