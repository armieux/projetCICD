class Group {
    constructor(id) {
        this.id = id; // Unique identifier
        this.members = []; // List of users in the group
    }

    addMember(user) {
        this.members.push(user);
        user.group = this.id; // Update the user's group
    }

    removeMember(user) {
        this.members = this.members.filter(member => member.id !== user.id);
        user.group = null; // Remove the user from the group
    }
}

export default Group;