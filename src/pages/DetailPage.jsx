import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const DetailPage = () => {

    const { id } = useParams();
    const [detailFilm, setDetailFilm] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8080/api/films/${id}`).then((resp) => { setDetailFilm(resp.data) }).catch((err) => { console.log(err) })
    }, [])

    if (!detailFilm) return <p>caricamenti</p>

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-12 my-4 text-center">
                        <img src={detailFilm.poster} alt="" className='detailPoster' />
                    </div>
                    <div className='col-lg-8 col-md-12 my-4 d-flex align-items-center'>
                        <div className='mx-3'>
                            <h1 className='mb-4 card-title-color'>{detailFilm.title}</h1>
                            <h3 className='mb-4 card-title-color'>Diretto da: {detailFilm.director}</h3>
                            <h5 className='mb-4'>Durata: {detailFilm.length}min</h5>
                            <h5 className='mb-4'>
                                Pubblicato il: {new Date(detailFilm.publication_date).toLocaleDateString('it-IT', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </h5>

                            <h5 className='mb-4'>Lingua Originale: {detailFilm.original_language}</h5>
                            <div>
                                <h5>Trama:</h5>
                                {detailFilm.plot}
                            </div>
                            <div className='mt-4'>
                                <h5>Lista Attori:</h5>
                                {detailFilm.actors.length > 0 ? (
                                    detailFilm.actors.map((actor, index) => (
                                        <span key={actor.id}>
                                            {actor.name}
                                            {index < detailFilm.actors.length - 1 && ', '}
                                        </span>
                                    ))
                                ) : (
                                    <p>Nessun attore disponibile</p>
                                )}
                            </div>
                            <div className='mt-4'>
                                <h5>Lista Generi:</h5>
                                {detailFilm.genres.length > 0 ? (
                                    detailFilm.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            {genre.name}
                                            {index < detailFilm.genres.length - 1 && ', '}
                                        </span>
                                    ))
                                ) : (
                                    <p>Nessun genere disponibile</p>
                                )}
                            </div>

                            <Link className='btn mt-5' to={`/`}>Torna ai film</Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailPage
