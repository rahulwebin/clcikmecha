import React, { useState, useEffect } from 'react';
import './Clientele.css';

import Contact from '../../components/Contact/Contact';
import { usePageMeta } from '../../hooks/usePageMeta';

const Clientele = () => {
    usePageMeta('clientele');
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('https://cms.clickmecha.com/api/clients');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                if (result.status && Array.isArray(result.data)) {
                    setClients(result.data);
                } else {
                    throw new Error('API returned unsuccessful status or invalid data format');
                }
            } catch (err) {
                console.error("Error fetching clients:", err);
                setError('Failed to load clients. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="clientele-page">
            <div className="container">
                <div className="clientele-header text-center">
                    <h1 className="clientele-title">Clientele</h1>
                    <p className="clientele-desc">
                        We are known for executing campaigns in a unique style & fashion. We have a history of
                        delivering successful Outdoor Media Campaigns both locally as well as at the PAN India
                        level. Our work speaks for itself.
                    </p>
                </div>

                {loading && <div className="text-center my-5">Loading clients...</div>}

                {error && <div className="text-center text-danger my-5">{error}</div>}

                {!loading && !error && (
                    <div className="clientele-grid">
                        {clients.map((client) => (
                            <div key={client.id} className="client-logo-card">
                                <img src={client.logo_url} alt={client.name} className="client-logo-img" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Contact preHeading="A Unit Of Alakh Advertising And Publicity Pvt Ltd" />
        </div>
    );
};

export default Clientele;
