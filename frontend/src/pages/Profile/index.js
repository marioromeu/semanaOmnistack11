import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteIncident(id) {
        console.log('pressed');
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

        }catch(err){
            alert('Erro ao deletar o caso, tente novamente.')
        }

    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>

                <img src={logoImg} alt="Be the Hero" />

                <spam>Bem Vinda, {ongName}</spam>

                <Link className="button" to="/incidents/new">                    
                    Cadastrar Novo Caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={16} color="#E02041"></FiPower>
                </button>

            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>
                        {incident.title}
                    </p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>
                        {incident.description}
                    </p>

                    <strong>VALOR:</strong>
                    <p>                        
                        {
                            Intl.NumberFormat(
                                'pt-BR',
                                {
                                    style: 'currency',
                                    currency:'BRL'
                                }
                            ).format(
                                incident.value
                            )
                        }
                    </p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>                        
                    </button>

                </li>
                ))}
            </ul>

        </div>
    );
}