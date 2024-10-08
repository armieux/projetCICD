import React, { useState } from 'react';

function AdminDashboard() {
    const [numUsers, setNumUsers] = useState(0);
    const [numGroups, setNumGroups] = useState(0);
    const [lastGroupConfig, setLastGroupConfig] = useState('LAST_MIN');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the data to the server
        console.log({ numUsers, numGroups, lastGroupConfig });
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre d'utilisateurs :</label>
                    <input
                        type="number"
                        value={numUsers}
                        onChange={(e) => setNumUsers(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Nombre de groupes :</label>
                    <input
                        type="number"
                        value={numGroups}
                        onChange={(e) => setNumGroups(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Configuration du dernier groupe :</label>
                    <select
                        value={lastGroupConfig}
                        onChange={(e) => setLastGroupConfig(e.target.value)}
                    >
                        <option value="LAST_MIN">LAST_MIN</option>
                        <option value="LAST_MAX">LAST_MAX</option>
                    </select>
                </div>
                <button type="submit">Configurer les groupes</button>
            </form>
        </div>
    );
}

export default AdminDashboard;