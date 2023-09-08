import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Vans() {
    const [vans, setVans] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type");

    useEffect(() => {
        async function getData() {
            const res = await fetch("/api/vans")
            const data = await res.json()
            setVans(data.vans)
        }
        getData()
    }, [])

    const displayedCharacters = typeFilter ?
    vans.filter(van => van.type.toLowerCase() === typeFilter) :
    vans

    const vanElements = displayedCharacters.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`${van.id}`}>
            <img src={van.imageUrl} />
            <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
            </div>
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))

    // function genNewSearchParamString(key, value) {
    //     const sp = new URLSearchParams(searchParams)
    //     if(value === null) {
    //         sp.delete(key)
    //     }else {
    //         sp.set(key, value)
    //     }
    //     return `?${sp.toString()}`
    // }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                {/* <Link to={genNewSearchParamString("type", "simple")}>Simple</Link>
                <Link to={genNewSearchParamString("type", "luxury")}>Luxury</Link>
                <Link to={genNewSearchParamString("type", "rugged")}>Rugged</Link>
                <Link to={genNewSearchParamString("type", null)}>Clear Filters</Link> */}

                <button onClick={() => handleFilterChange("type", "simple")} className= {`van-type simple ${typeFilter === "simple" ? "selected" : ""}`} >Simple</button>
                <button onClick={() => handleFilterChange("type", "luxury")} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`} >Luxury</button>
                <button onClick={() => handleFilterChange("type", "rugged")} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`} >Rugged</button>
                { typeFilter ?
                    (<button onClick={() => handleFilterChange("type", null)} className="van-type clear-filters">Clear Filters</button>) :
                    null }
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}

export default Vans;