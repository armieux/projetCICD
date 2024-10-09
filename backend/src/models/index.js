const User = require('./user');
const Group = require('./group');
const GroupInvitation = require('./group-invitation');

// Définir toutes les associations ici
Group.hasMany(User, { foreignKey: 'groupId' });
User.belongsTo(Group, { foreignKey: 'groupId' });
User.belongsToMany(GroupInvitation, { through: 'UserGroupInvitation' });

Group.hasMany(GroupInvitation, { foreignKey: 'groupId' });
GroupInvitation.belongsTo(Group, { foreignKey: 'groupId' });

GroupInvitation.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
GroupInvitation.belongsToMany(User, { through: 'UserGroupInvitation' });
User.belongsToMany(GroupInvitation, { through: 'UserGroupInvitation' });

module.exports = {
    User,
    Group,
    GroupInvitation
};