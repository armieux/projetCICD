const Group = require('../models/group'); // Assurez-vous d'avoir un modèle Group
const User = require('../models/user'); // Ensure you import the User model
const GroupInvitation = require('../models/group-invitation'); // Assurez-vous d'avoir un modèle GroupInvitation

// Récupérer la liste des groupes
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer un lien d'invitation pour un groupe
exports.createGroupInvitation = async (req, res) => {
    const userId = req.body.userId;
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // const inviteId = uuidv4(); // Generate a unique ID for the group invitation
    const newGroupInvitation = new GroupInvitation({
        // inviteId,
        status: 'pending',
        creatorId: userId, // Set the creator of the group invitation
        members: [userId], // Add the user as a member of the group invitation
    });
    try {
        const savedGroupInvitation = await newGroupInvitation.save();
        res.status(201).json(savedGroupInvitation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Ajouter un utilisateur à un groupe
exports.addUserToGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Check if user already exists in the group
        if (!group.users.includes(req.params.userId)) {
            group.users.push(req.params.userId); // Assuming users is an array
            await group.save();
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retirer un utilisateur d'un groupe
exports.removeUserFromGroup = async (req, res) => {
    try {
        const group = await Group.findByPk(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Ensure user is part of the group before attempting to remove
        const userIndex = group.users.indexOf(req.params.userId);
        if (userIndex > -1) {
            group.users.splice(userIndex, 1); // Remove user from array
            await group.save();
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};// Ajouter un utilisateur à un groupe
exports.addUserToGroup = async (req, res) => {
    try {
        // Find the group and include the associated users
        const group = await Group.findByPk(req.params.groupId, { include: User });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }


        // Check if user is already in the group
        const userAlreadyInGroup = group.Users.some(user => user.id === parseInt(req.body.userId));
        if (!userAlreadyInGroup) {
            const user = await User.findByPk(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await group.addUser(user); // Use Sequelize's addUser method for many-to-many relationships
            res.status(200).json({ message: 'User added to group', group });
        } else {
            res.status(400).json({ message: 'User already in group' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retirer un utilisateur d'un groupe
exports.removeUserFromGroup = async (req, res) => {
    try {
        // Find the group and include the associated users
        const group = await Group.findByPk(req.params.groupId, { include: User });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if user is in the group
        const userInGroup = group.Users.some(user => user.id === parseInt(req.body.userId));
        if (userInGroup) {
            const user = await User.findByPk(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await group.removeUser(user); // Use Sequelize's removeUser method for many-to-many relationships
            res.status(200).json({ message: 'User removed from group', group });
        } else {
            res.status(400).json({ message: 'User not in group' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Join a group using an invitation link
exports.respondToInvitation = async (req, res) => {
    // try {
    const inviteId = req.params.inviteId;
    const userId = req.body.userId;

    console.log(inviteId, 'inviteId');
    console.log(userId, 'userId');

    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    console.log('user', user);

    const groupInvitation = await GroupInvitation.findOne({ where: { inviteId } });
    if (!groupInvitation) {
        return res.status(404).json({ message: 'Group invitation not found' });
    }

    console.log('groupInvitation', groupInvitation);

    // Check if user is already part of the group
    const existingUsers = await groupInvitation.getUsers({ where: { id: userId } });
    if (existingUsers.length > 0) {
        return res.status(400).json({ message: 'User is already part of the group invitation' });
    }

    // Update the group invitation with the user's ID
    await groupInvitation.addUser(user);

    // Check if group invitation have already a group
    const groupId = groupInvitation.groupId;
    if (groupId) {
        const group = await Group.findByPk(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Add user to the group
        group.users.push(userId);
        await group.save();
        return res.status(200).json({ message: 'User added to group' });
    } else if (groupInvitation.members.length >= 2) {
        // If group invitation have enough members, create a group
        const newGroup = new Group({
            "name": "Group ID" + inviteId,
        });
        await newGroup.save();

        // For each member, add them to the group
        for (const memberId of groupInvitation.members) {
            const member = await User.findByPk(memberId);
            if (member) {
                member.groupId = newGroup.id;
                await member.save();
            }
        }
    }
    // } catch (error) {
    //     res.status(400).json({ message: error.message });
    // }
};

