import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import GroupList from './GroupList';
import UserList from './UserList';

const AdminDashboard = () => {
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadGroups = async () => {
            try {
                const fetchedGroups = await apiService.fetchGroups();
                setGroups(fetchedGroups);
            } catch (error) {
                console.error('Erreur lors de la récupération des groupes:', error);
            }
        };

        const loadUsers = async () => {
            try {
                const fetchedUsers = await apiService.fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            }
        };

        loadGroups();
        loadUsers();
    }, []);

    const createGroup = async () => {
        try {
            const newGroup = await apiService.createGroup();
            setGroups((prevGroups) => [...prevGroups, newGroup]);
        } catch (error) {
            console.error('Erreur lors de la création du groupe:', error);
        }
    };

    const addUserToGroup = async (userId, groupId) => {
        try {
            await apiService.addUserToGroup(userId, groupId);
            setGroups((prevGroups) => prevGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, members: [...group.members, userId] };
                }
                return group;
            }));
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe:', error);
        }
    };

    const removeUserFromGroup = async (userId, groupId) => {
        try {
            await apiService.removeUserFromGroup(userId, groupId);
            setGroups((prevGroups) => prevGroups.map(group => {
                if (group.id === groupId) {
                    return { ...group, members: group.members.filter(memberId => memberId !== userId) };
                }
                return group;
            }));
        } catch (error) {
            console.error('Erreur lors du retrait de l\'utilisateur du groupe:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={createGroup}>Créer un groupe</button>
            <GroupList groups={groups} />
            <UserList users={users} addUserToGroup={addUserToGroup} removeUserFromGroup={removeUserFromGroup} />
        </div>
    );
};

export default AdminDashboard;