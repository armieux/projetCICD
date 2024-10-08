import React from 'react';

const UserList = ({ users, addUserToGroup, removeUserFromGroup }) => {
    return (
        <div>
            <h2>Utilisateurs</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.id}
                        {user.group ? (
                            <button onClick={() => removeUserFromGroup(user.id, user.group)}>Retirer du groupe</button>
                        ) : (
                            <button onClick={() => addUserToGroup(user.id, 1)}>Ajouter au groupe 1</button> // Vous pouvez améliorer pour choisir le groupe
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;