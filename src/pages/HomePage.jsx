import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/style.css'
import FilmCard from '../components/FilmCard'
import axios from 'axios'

const HomePage = () => {

    const [films, setFilms] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8080/api/films").then((resp) => {
            console.log("Risposta API:", resp);
            setFilms(resp.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (

        <>


            <div className="container">
                <h2 className='mb-3'>
                    <i>Tutti i Film</i>
                </h2>
                <div className="row mb-3">
                    {films.length > 0 ? (
                        films.map((film) => (
                            <FilmCard film={film} key={film.id} />
                        ))
                    ) : (
                        <p>Nessun film disponibile</p>
                    )}

                </div>
            </div>


        </>
    )
}

export default HomePage
