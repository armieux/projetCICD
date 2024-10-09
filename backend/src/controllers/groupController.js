    const Group = require('../models/group'); // Assurez-vous d'avoir un modèle Group
    const User = require('../models/user'); // Ensure you import the User model

    // Récupérer la liste des groupes
    exports.getGroups = async (req, res) => {
        try {
            const groups = await Group.findAll({
                include: {
                    model: User,
                    as: 'Users', // Make sure this matches the alias defined in the association if any
                    attributes: ['id', 'firstname', 'lastname', 'email'], // Specify the fields you want to include
                    through: { attributes: [] } // Exclude the join table attributes
                }
            });
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Créer un nouveau groupe
    exports.createGroup = async (req, res) => {
        const newGroup = new Group(req.body);
        try {
            const savedGroup = await newGroup.save();
            res.status(201).json(savedGroup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

   // Ajouter un utilisateur à un groupe
    exports.addUserToGroup = async (req, res) => {
        try {
            // Find the group and include the associated users
            const group = await Group.findByPk(req.params.groupId, {
                include: {
                    model: User,
                    as: 'Users',
                    attributes: ['id', 'firstname', 'lastname', 'email'],
                    through: { attributes: [] } // Exclude the join table attributes
                }
            });

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

                // Reload the group with updated users
                const updatedGroup = await Group.findByPk(req.params.groupId, {
                    include: {
                        model: User,
                        as: 'Users',
                        attributes: ['id', 'firstname', 'lastname', 'email'],
                        through: { attributes: [] }
                    }
                });

                return res.status(200).json({ message: 'User added to group', group: updatedGroup });
            } else {
                return res.status(400).json({ message: 'User already in group' });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };


    // Retirer un utilisateur d'un groupe
    exports.removeUserFromGroup = async (req, res) => {
        try {
            // Find the group and include the associated users
            const group = await Group.findByPk(req.params.groupId, {
                include: {
                    model: User,
                    as: 'Users',
                    attributes: ['id', 'firstname', 'lastname', 'email'],
                    through: { attributes: [] } // Exclude the join table attributes
                }
            });

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            // Check if user is in the group
            const userInGroup = group.Users.some(user => user.id === parseInt(req.params.userId));
            if (userInGroup) {
                const user = await User.findByPk(req.params.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                await group.removeUser(user); // Use Sequelize's removeUser method for many-to-many relationships

                // Reload the group with updated users
                const updatedGroup = await Group.findByPk(req.params.groupId, {
                    include: {
                        model: User,
                        as: 'Users',
                        attributes: ['id', 'firstname', 'lastname', 'email'],
                        through: { attributes: [] }
                    }
                });

                return res.status(200).json({ message: 'User removed from group', group: updatedGroup });
            } else {
                return res.status(400).json({ message: 'User not in group' });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    // Delete a group
    exports.deleteGroup = async (req, res) => {
        try {
            const group = await Group.findByPk(req.params.groupId);

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            // Delete the group
            await group.destroy();

            res.status(200).json({ message: 'Group deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };



