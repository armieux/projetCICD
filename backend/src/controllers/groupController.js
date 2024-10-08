const Group = require('../models/group'); // Assurez-vous d'avoir un modèle Group

// Récupérer la liste des groupes
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
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
        const group = await Group.findById(req.params.groupId);
        group.users.push(req.params.userId);
        const updatedGroup = await group.save();
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Retirer un utilisateur d'un groupe
exports.removeUserFromGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        group.users = group.users.filter(user => user.toString() !== req.params.userId);
        const updatedGroup = await group.save();
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
