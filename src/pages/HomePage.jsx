import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/style.css'
import FilmCard from '../components/FilmCard'
import axios from 'axios'

const HomePage = () => {

    const [search, setSearch] = useState('')
    const [films, setFilms] = useState([])

    useEffect(() => {
        axios.get("http://127.0.0.1:8080/api/films").then((resp) => {
            console.log("Risposta API:", resp);
            setFilms(resp.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const fetchFilmsByTitle = () => {
        axios.get(`http://127.0.0.1:8080/api/films?title=${search}`)
            .then((resp) => setFilms(resp.data))
            .catch((err) => console.log(err));
    }

    return (

        <>


            <div className="container">
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='mb-3'>
                        <i>Tutti i Film</i>
                    </h2>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            fetchFilmsByTitle();
                        }}
                        className="mb-4"
                    >
                        <div className='d-flex justify-content-center align-items-center'>
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Cerca per titolo..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="submit" className="btn">Cerca</button>
                        </div>

                    </form>



                </div>
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
