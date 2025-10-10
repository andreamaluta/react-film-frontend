import React from 'react'
import { Link } from 'react-router-dom'

const FilmCard = ({ film }) => {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-4 g-3" key={film.id}>
                <div className="card h-100">
                    <div className="card-img-container h-75">
                        <Link to={`/films/${film.id}`}>
                            <img src={film.poster} alt="" className='img-fluid card-img-top' />
                        </Link>
                    </div>
                    <div className="card-body ">
                        <h3 className='card-title-color'>{film.title}</h3>
                        <h4 className='card-director-color'>Direttore: {film.director}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilmCard
