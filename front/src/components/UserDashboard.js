import React, { useState, useEffect } from 'react';
import LoginForm from './LoginFormComponent';
import RegisterForm from './RegisterFormComponent';
import groupService from '../services/groupService';

function UserDashboard() {
    const [groupLink, setGroupLink] = useState('');
    const [groupInfo, setGroupInfo] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        // Whenever groupLink changes, update localStorage
        localStorage.setItem('groupLink', groupLink);
    }, [groupLink]);

    const handleCreateGroup = async () => {
        try {
            const groupData = await groupService.createGroup();
            const link = `http://localhost:3000/invitation/${groupData.inviteId}`; // Assuming the API returns an inviteId
            setGroupLink(link);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleJoinGroup = (link) => {
        // Join a group using the link (API call to come)
        setGroupInfo({ groupId: 1, members: ['User1', 'User2'] }); // Exemples statiques
    };

    const handleRandomGroup = () => {
        // Place the user in a random group (API call to come)
        setGroupInfo({ groupId: 2, members: ['User3', 'User4', 'User5'] });
    };

    return (
        <div>
            <h1>User Dashboard</h1>
            {userId && <p>User ID: {userId}</p>}
            <div>
                {!groupLink && <button onClick={handleCreateGroup}>Créer un groupe</button>}
                {groupLink && <p>Lien d'invitation : <a href={groupLink}>{groupLink}</a></p>}
            </div>
            <div>
                <button onClick={() => handleJoinGroup(groupLink)}>Rejoindre un groupe</button>
            </div>
            <div>
                <button onClick={handleRandomGroup}>Placement automatique dans un groupe</button>
            </div>
            {groupInfo && (
                <div>
                    <h3>Groupe {groupInfo.groupId}</h3>
                    <p>Membres : {groupInfo.members.join(', ')}</p>
                </div>
            )}

            <br />

            {!userId && (
                <>
                    <div>
                        <LoginForm />
                    </div>

                    <br />

                    <div>
                        <RegisterForm />
                    </div>
                </>
            )}

            <br />

            <div>
                <button onClick={() => localStorage.clear()}>Déconnexion</button>
            </div>
        </div>
    );
}

export default UserDashboard;