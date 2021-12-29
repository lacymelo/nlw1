import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import api from "../../services/api";
import axios from "axios";

import './styles.css';

import logo from '../../assets/logo.svg';

// array ou objeto: manualmente informar o tipo da variável

interface Item{
    id: number,
    title: string,
    image_url: string
}

interface IBGEUFResponse {
    sigla: string
}
interface IBGECityResponse {
    nome: string
}

const CreatePoint = () => {

    //armazenando o estado dos items
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<String[]>([]);
    const [cities, setCity] = useState<String[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityInitials = response.data.map(uf => uf.nome);
            setCity(cityInitials);
        });
    }, [selectedUf]);

    //disparada quando é selecionado um estado
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>){
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    //disparada quando é selecionado uma cidade
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>){
        const city = event.target.value;
        setSelectedCity(city);
    }

    const Markers = () => {

        useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);     
                
                console.log(e.latlng);
            },            
        })
    
        return (
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false} 
                />
            : null
        )   
        
    }

    return(
        <>
            <div id="page-create-point">
                <header>
                    <img src={logo} alt="Ecoleta" />

                    <Link to="/">
                        <FiArrowLeft/>

                        Voltar para home
                    </Link>
                </header>

                <form>
                    <h1>Cadastro do<br/> ponto de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="name">
                                Nome da entidade
                            </label>

                            <input
                                type="text"
                                name="name"
                                id="name"
                                 />
                        </div>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">
                                    E-mail
                                </label>

                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    />
                            </div>

                            <div className="field">
                                <label htmlFor="whatsapp">
                                    Whatsapp
                                </label>

                                <input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    />
                            </div>
                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço no mapa</span>
                        </legend>

                        <MapContainer center={[-2.237008, -49.502241]} zoom={15}>
                            <TileLayer
                                attribution='&amp; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        
                            <Markers />
                        </MapContainer>

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select name="uf" id="uf" onChange={e => handleSelectUf(e)}>
                                    <option value="0"> -- Selecione uma UF -- </option>
                                    {ufs.map(uf => (
                                        <option key={String(uf)} value={String(uf)}>{uf}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select name="city" id="city" onChange={e => handleSelectCity(e)}>
                                    <option value="0">Selecione sua cidade</option>
                                    {cities.map(city => (
                                        <option key={String(city)} value={String(city)}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Items de Coleta</h2>
                            <span>Selecione um ou mais items abaixo</span>
                        </legend>

                        <ul className="items-grid">
                            {items.map(item => (
                                <li key={item.id}>
                                    <img src={item.image_url} alt="teste" />
                                    <span>{item.title}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>

                    <button type="submit">
                        Cadastrar ponto de coleta
                    </button>
                </form>
            </div>
        </>
    );  
}

export default CreatePoint;