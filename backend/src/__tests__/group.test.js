const request = require('supertest');
const app = require('../app'); // Assuming you have an Express app
const Group = require('../models/group'); // Ensure you have a Group model
const User = require('../models/user'); // Ensure you import the User model
const db = require('../config/database-test'); // Import the database connection

const userData = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com', // Corrected the email
};

const groupData = {
    name: 'Test Group',
    // Add other required fields if necessary
};

let groupId = '';
let userId = '';

beforeAll(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        // Synchronize models with the database
        await db.sync({ force: false });
        console.log('Database synchronized.');

        // Check if user exists; if yes, delete it
        const userCheck = await User.findOne({ where: { email: userData.email } });
        if (userCheck) {
            await userCheck.destroy();
        }

        // Setup: create a user for testing purposes
        let user = new User(userData);
        user = await user.save();
        userId = user.id;

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});

afterAll(async () => {
    // Clean up any remaining test user
    await User.destroy({ where: { email: userData.email } });
    await Group.destroy({ where: { id: groupId } }); // Ensure group is deleted
    // Close the database connection
    await db.close();
});

describe('Group API', () => {
    it('should create a new group', async () => {
        const res = await request(app)
            .post('/api/groups')
            .send(groupData);

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(groupData.name);
        groupId = res.body.id;
    });

    it('should add a user to the group', async () => {
        const res = await request(app)
            .post(`/api/groups/${groupId}/users`)
            .send({ userId });

        expect(res.statusCode).toEqual(200);
        expect(res.body.group.Users).toContainEqual(expect.objectContaining({ id: userId }));
    });

    it('should remove a user from the group', async () => {
        const res = await request(app)
            .delete(`/api/groups/${groupId}/users/${userId}`); // Sending userId in body as expected by the endpoint

        expect(res.statusCode).toEqual(200);
        expect(res.body.group.Users).not.toContainEqual(expect.objectContaining({ id: userId }));
    });

    it('should delete the group', async () => {
        const res = await request(app)
            .delete(`/api/groups/${groupId}`);

        expect(res.statusCode).toEqual(200);

        // Verify that the group has been deleted
        const groupRes = await request(app).get(`/api/groups/${groupId}`);
        expect(groupRes.statusCode).toEqual(404);
    });
});
