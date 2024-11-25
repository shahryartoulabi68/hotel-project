import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { useHotels } from '../Context/HotelsProvider';

function Hotels() {

    const { isLoading, hotels, currentHotel } = useHotels()
    if (isLoading) return <Loader />
    return (
        <div className='searchList'>
            <h2>search Risult ({hotels.length})</h2>
            {
                hotels.map((item) => {
                    return <Link key={item.id}
                        to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className={`searchItem ${item.id === currentHotel?.id ? "current-hotel" : ""}`}>
                            <img src={item.thumbnail_url} alt={"picture"} />
                            <div className="searchItemDesc">
                                <p className="location">{item.smart_location}</p>
                                <p className="name">{item.name}</p>
                                <p className="location">{item.smart_location}</p>
                                $ &nbsp;{item.price}&nbsp;
                                <span>night</span>
                            </div>
                        </div>
                    </Link>
                })
            }

        </div>
    )
}

export default Hotels
