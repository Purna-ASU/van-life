import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom"

export default function VanDetail() {
    const params = useParams();
    const [van, setVan] = useState(null)
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try{
                const data = await res.json()
                setVan(data) 
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [params.id]) 

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>{`Back to ${type} vans`}</span></Link>
            {van && (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div> 
            )}
        </div>
    )
}
