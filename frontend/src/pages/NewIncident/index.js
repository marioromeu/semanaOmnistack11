import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        console.log('NewIncident/new [00] => ' + data);

        try{
            await api.post('/incidents', data, {
                headers: {
                    Authorization : ongId,
                }
            });

            console.log('NewIncident/new [01] => ');

            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar caso, tente novamente');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma, e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                       <input
                            placeholder="Título do caso"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                       <textarea
                            placeholder="Descrição"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                       />

                       <input
                            placeholder="Valor em R$"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />

                       <button className="button" type="submit">
                            Cadastrar
                       </button>

                </form>

            </div>
        </div>
    );
}