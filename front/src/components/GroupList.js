import React from 'react';

const GroupList = ({ groups, deleteGroup }) => {
    return (
        <div>
            <h2>Groupes</h2>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        {`Groupe ${group.id} - Membres: ${group.members.length}`}
                        <button onClick={() => deleteGroup(group.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupList;