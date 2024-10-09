import Group from './../../src/models/Group';

describe('Group', () => {
    it('should create a group with an id', () => {
        const group = new Group(1);
        expect(group.id).toBe(1);
    });

    it('should add a member to the group', () => {
        const group = new Group(1);
        const user = { id: 'user1' };
        group.addMember(user);
        expect(group.members).toContain(user);
    });

    it('should remove a member from the group', () => {
        const group = new Group(1);
        const user = { id: 'user1' };
        group.addMember(user);
        group.removeMember(user);
        expect(group.members).not.toContain(user);
    });
});