import React, { useState } from 'react';
import LoginForm from './LoginFormComponent';
import RegisterForm from './RegisterFormComponent';

function UserDashboard() {
    const [groupLink, setGroupLink] = useState('');
    const [groupInfo, setGroupInfo] = useState(null);

    const handleCreateGroup = () => {
        // Create a link for the user to share with others (API call to come)
        setGroupLink(`https://groupmanager.com/invite/${Math.random().toString(36).substr(2, 9)}`);
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
            <div>
                <button onClick={handleCreateGroup}>Créer un groupe</button>
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

            <div>
                <LoginForm />
            </div>

            <br />

            <div>
                <RegisterForm />
            </div>
        </div>
    );
}

export default UserDashboard;