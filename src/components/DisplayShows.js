import React, {useEffect, useState} from 'react'
import parse from 'html-react-parser';

const DisplayShows = ({showDataActor, loaded, searchBy, showDataShow}) => {
 

  return (
    <div className='show_container' >
        <div className='show_cart_container'>
            {
                loaded && searchBy === "Actors" ?
                showDataActor.map((shows, i)=>{

                return <div className='show_cart' key={i}>
                            <img 
                                className='show_image' 
                                src={ shows._embedded.show.image === null ? 'https://christopherscottdesigner.files.wordpress.com/2014/05/this-poster-is-not-available-christopher-scott1.jpg' 
                                        : shows._embedded.show.image.medium } 
                            ></img>
                            <div className='cart_detail'>
                                <h1 className='show_name'>{shows._embedded.show.name}</h1>
                                <p className='show_summery' >{shows._embedded.show.summary !== null ? parse(shows._embedded.show.summary)  : "--" }</p>
                                <p className='show_rating' >⭐ {shows._embedded.show.rating.average !== null ? shows._embedded.show.rating.average : "0.0" }</p>
                            </div>
                        </div>
            }) : loaded && searchBy === "Shows" ?  
            showDataShow.map((shows, i)=>{
                return <div className='show_cart' key={i}>
                            <img 
                                className='show_image' 
                                src={shows.show.image === null ? 'https://christopherscottdesigner.files.wordpress.com/2014/05/this-poster-is-not-available-christopher-scott1.jpg' 
                                        : shows.show.image.medium } 
                            ></img>
                            <div className='cart_detail'>
                                <h1 className='show_name'>{shows.show.name}</h1>
                                <p className='show_summery' >{shows.show.summary !== null ? parse(shows.show.summary) : "--" }</p>
                                <p className='show_rating' >⭐ {shows.show.rating.average !== null ? shows.show.rating.average : "0.0" }</p>
                            </div>
                        </div>
            }) : <><h1>no data to show</h1></>
            }
        </div>
    </div>
  )
}

export default DisplayShows
