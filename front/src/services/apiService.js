const BASE_URL = 'http://localhost:4949';

const apiService = {
    async fetchGroups() {
        const response = await fetch(`${BASE_URL}/api/groups`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des groupes');
        }
        return await response.json();
    },

    async createGroup(groupData) {
        const response = await fetch(`${BASE_URL}/api/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupData }),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création du groupe');
        }
        return await response.json();
    },

    async addUserToGroup(userId, groupId) {
        const response = await fetch(`${BASE_URL}/api/groups/${groupId}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'utilisateur au groupe');
        }
        return await response.json();
    },

    async removeUserFromGroup(userId, groupId) {
        const response = await fetch(`${BASE_URL}/api/groups/${groupId}/users/${userId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erreur lors du retrait de l\'utilisateur du groupe');
        }
        return await response.json();
    },

    async fetchUsers() {
        const response = await fetch(`${BASE_URL}/api/users`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        return await response.json();
    },

    async createUser(userData) {
        const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la création de l\'utilisateur');
        }
        return await response.json();
    },

    async loginUser(email) {
        const response = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (!response.ok) {
            throw new Error('Échec de la connexion');
        }
        return await response.json();
    },
};

export default apiService;