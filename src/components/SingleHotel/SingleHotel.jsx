import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetcher from '../../Hooks/useFatch'
import Loader from '../Loader/Loader'
import { useHotels } from '../Context/HotelsProvider'

function SingleHotel() {
    const { id } = useParams()
    const { isLoadingCurrHotel, currentHotel, getHotele } = useHotels()
    useEffect(() => {
        getHotele(id)
    }, [id])
    if (isLoadingCurrHotel) return <Loader />
    return (
        <div className='room'>
            <div className="roomDetail">
                <h2>{currentHotel.name}</h2>
                <div>
                    {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
                </div>
                <img src={currentHotel.thumbnail_url} alt="picutrs" />
            </div>
        </div>
    )
}

export default SingleHotel
