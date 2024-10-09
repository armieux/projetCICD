const app = require('../app'); // Assuming you have an Express app
const Group = require('../models/group'); // Assurez-vous d'avoir un modèle Group
const User = require('../models/user'); // Ensure you import the User model
const { userData, groupData } =   './testData';

let groupId = '';
let userId = '';

beforeAll(async () => {
    // Setup: create a user for testing purposes
    let user = new User(userData);
    user = await user.save();
    userId = user.id;

    // Clean up any previous test groups
    //await Group.destroy({ where: { name: groupData.name } });
});

afterAll(async () => {
    // Clean up the test group and user after tests
    //await Group.destroy({ where: { id: groupId } });
    //await User.destroy({ where: { id: userId } });
});

describe('Group API', () => {
    it('should create a new group', async () => {
        const res = await request(app)
            .post('/groups')
            .send(groupData);

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(groupData.name);
        groupId = res.body.id;
    });

    it('should fetch the group by ID', async () => {
        const res = await request(app)
            .get(`/groups/${groupId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(groupId);
        expect(res.body.name).toEqual(groupData.name);
    });

    it('should add a user to the group', async () => {
        const res = await request(app)
            .post(`/groups/${groupId}/addUser`)
            .send({ userId });

        expect(res.statusCode).toEqual(200);
        expect(res.body.Users).toContainEqual(expect.objectContaining({ id: userId }));
    });

    it('should remove a user from the group', async () => {
        const res = await request(app)
            .post(`/groups/${groupId}/removeUser`)
            .send({ userId });

        expect(res.statusCode).toEqual(200);
        const groupRes = await request(app).get(`/groups/${groupId}`);
        expect(groupRes.body.Users).not.toContainEqual(expect.objectContaining({ id: userId }));
    });

    it('should delete the group', async () => {
        const res = await request(app)
            .delete(`/groups/${groupId}`);

        expect(res.statusCode).toEqual(200);
        const groupRes = await request(app).get(`/groups/${groupId}`);
        expect(groupRes.statusCode).toEqual(404);
    });
});
