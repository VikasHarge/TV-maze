import React, { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios';
import DisplayShows from './DisplayShows';




const MovieHome = () => {

    const [searchBy, setSearchBy] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [isdisabled, setIsDisabled] = useState(true)


    const [showDataActor, setShowDataActor] = useState([])
    const [showDataShow, setShowDataShow] = useState()
    const [actorId, setActorId] = useState(0)
    const [actorFound, setaAtorFound] = useState(false)

    const inputRef = useRef()



    const RadioChangeHandle = (e)=>{
        setSearchBy(e.target.value)
        setShowDataShow([])
        setShowDataActor([])
        setSearchKey('')
    }

    const inputHandle = (e)=>{
        setSearchKey(inputRef.current.value)
        setaAtorFound(false)
    }

    useEffect(()=>{
        if(searchBy !== ""){
            setIsDisabled(false)
        }
    }, [searchBy])

    useEffect(()=>{
  
        const fetchActorId = async () => {
            console.log("in actor : " + searchKey);
            setLoaded(false)
            await fetch(`https://api.tvmaze.com/search/people?q=${searchKey}`)
                .then((res)=>res.json())
                .then(res=> {
                    setLoaded(true)
                    // console.log(res)
                    // setActorId(res)
                    getActorId(res)
                })
                .catch((e)=> {
                    console.log("no data");
                })  
        };

        const fetchShow = async ()=> {
            setLoaded(false)
            await fetch(`https://api.tvmaze.com/search/shows?q=${searchKey}`)
                .then(res => res.json())
                .then(res => {
                    setLoaded(true)
                    setShowDataShow(res)
                    setaAtorFound(true)
                }).catch(e => console.log(e))
        }

        const timer = setTimeout(()=>{
            if(searchBy === "Actors"){
                fetchActorId();
            } if(searchBy === "Shows"){
                fetchShow()
            }
        }, 1000)

        return ()=> clearInterval(timer)

        }, [searchKey]) 


        const getActorId = (actorData)=>{

            actorData.filter((item)=>{

                if(item.person.name.toLowerCase().includes(searchKey.toLowerCase())){
                    // console.log(item.person.name.toLowerCase()+ " from api");
                    // console.log(searchKey.toLowerCase()+" ower own");
                    // console.log(item.person.id + " api id");
                    setActorId(item.person.id)
                    // console.log(actorId + " id in setId inside if loop");
                    return item;
                }

                // console.log(actorId + " id in setId inside filter");

            })
        
        }

        useEffect(()=>{

            console.log(actorId);

            if(actorId !== 0 ){
                fetch(`https://api.tvmaze.com/people/${actorId}/castcredits?embed=show`)
                .then((res)=> res.json())
                .then(res => {
                    setShowDataActor(res)
                    console.log(res);
                    setaAtorFound(true)
                }).catch((e)=>{
                    console.log("no data");
                })
            } 

            setActorId(0)

        }, [actorId])




    const submitHandle =(e)=>{
        e.preventDefault()
    }




  return (
    <div>
        <div className='homepage_container' >
            <div className='search_container' >
                <h1 className='title' >TV maze</h1>
                <p className='tag_line' >Search your favourite shows</p>
                <div className='radio_input' >
                    <form onSubmit={submitHandle} >
                        <div>
                            <label>
                                <input type='radio' value="Actors" name='shows' onChange={RadioChangeHandle} /> Actors
                            </label>
                            <label>
                                <input type='radio' value="Shows" name='shows' onChange={RadioChangeHandle} /> Shows
                            </label>
                        </div>
                        <div className='search_input'>
                            <p className='search_input_noti_1' >{searchBy === "Actors" ?  "Enter people below" : searchBy === "Shows" ?  "Enter show below" : ""} </p>
                            <input  
                                type='text' 
                                placeholder={searchBy === "Actors" ?  "eg: Akon...." : searchBy === "Shows" ?  "eg: Friends...." : ""} 
                                ref={inputRef}
                                onChange={inputHandle}
                                value={searchKey}
                                disabled={isdisabled}
                            />
                            <p className='search_input_noti_2' >{searchKey === '' ?  "" : actorFound ?  "" : "No data found" } </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <DisplayShows showDataActor={showDataActor} loaded={loaded} searchBy={searchBy} showDataShow={showDataShow} />
    </div>
  )
}

export default MovieHome
