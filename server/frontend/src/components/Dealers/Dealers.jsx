import React, { useState, useEffect } from 'react';

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    const [state_filter, setStateFilter] = useState("All");
    
    let curr_user = sessionStorage.getItem('username');

    const get_dealers = async () => {
        const res = await fetch("/djangoapp/get_dealers");
        const retobj = await res.json();
        if (retobj.status === 200) {
            setDealers(retobj.dealers);
        }
    };

    const filter_dealers = async (state) => {
        const res = await fetch(`/djangoapp/get_dealers/${state}`);
        const retobj = await res.json();
        if (retobj.status === 200) {
            setDealers(retobj.dealers);
        }
    };

    useEffect(() => {
        if (state_filter === "All") {
            get_dealers();
        } else {
            filter_dealers(state_filter);
        }
    }, [state_filter]);

    const logout = async (e) => {
        e.preventDefault();
        await fetch("/djangoapp/logout", { method: "POST" });
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <div style={{ padding: '20px' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Cars Dealership</h2>
                {curr_user ? (
                    <div>
                        <span style={{ marginRight: '15px' }}>Welcome, {curr_user}</span>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <a href="/login" style={{ marginRight: '10px' }}>Login</a>
                        <a href="/register">Register</a>
                    </div>
                )}
            </nav>

            <hr />
            
            <h3>Lista de Concesionarios</h3>
            <div style={{ marginBottom: '15px' }}>
                <label>Filtrar por Estado: </label>
                <select onChange={(e) => setStateFilter(e.target.value)}>
                    <option value="All">All States</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Texas">Texas</option>
                </select>
            </div>

            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre del Concesionario</th>
                        <th>Ciudad</th>
                        <th>Estado</th>
                        {curr_user && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {dealers.map(dealer => (
                        <tr key={dealer.id}>
                            <td>{dealer.id}</td>
                            <td>{dealer.full_name}</td>
                            <td>{dealer.city}</td>
                            <td>{dealer.state}</td>
                            {curr_user && (
                                <td>
                                    {/* Aquí está el botón ya corregido */}
                                    <a href={`/dealer/${dealer.id}`}>
                                        <button>Review Dealer</button>
                                    </a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dealers;