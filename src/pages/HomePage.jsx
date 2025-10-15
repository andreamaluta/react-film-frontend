import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/style.css'
import FilmCard from '../components/FilmCard'
import axios from 'axios'

const HomePage = () => {

    const [search, setSearch] = useState('')
    const [films, setFilms] = useState([])
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');


    useEffect(() => {
        axios.get("http://127.0.0.1:8080/api/films").then((resp) => {
            console.log("Risposta API:", resp);
            setFilms(resp.data);
        }).catch((err) => {
            console.log(err);
        })
        axios.get("http://127.0.0.1:8080/api/genres").then((resp) => {
            setGenres(resp.data);
        }).catch((err) =>
            console.log(err)
        );
    }, [])

    const fetchFilmsByTitle = () => {
        let url = `http://127.0.0.1:8080/api/films`;

        if (selectedGenre) {
            url = `http://127.0.0.1:8080/api/genres/${selectedGenre}/films`;
        }

        axios.get(url)
            .then((resp) => {
                const filtered = search
                    ? resp.data.filter(film =>
                        film.title.toLowerCase().includes(search.toLowerCase()))
                    : resp.data;

                setFilms(filtered);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchFilmsByTitle();
    }, [search, selectedGenre]);

    const fetchFilmsOrdered = () => {
        axios.get("http://127.0.0.1:8080/api/films/ordered").then((resp) => {
            console.log("Risposta API:", resp);
            setFilms(resp.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (

        <>


            <div className="container">
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='mb-3'>
                        <i>Tutti i Film</i>
                        <div className="btn btn-order ms-3" onClick={fetchFilmsOrdered}>Ordine Alfabetico</div>
                    </h2>

                    <form
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
                            <select
                                className="form-select me-2"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                <option value="">Tutti i generi</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
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
