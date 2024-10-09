class User {
    constructor(id, group, firstname, lastname, email) {
        this.id = id; // Unique identifier
        this.group = null; // Group the user is in
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }

    // Update the user's group
    setGroup(group) {
        this.group = group;
    }
}

export default User;