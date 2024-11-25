import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useHotels } from '../Context/HotelsProvider'

function AppLayout() {
    const { hotels } = useHotels()

    return (
        <div className='appLayout'>
            <div className="sidebar">
                <Outlet />
            </div>
            <Map marcerLocations={hotels} />
        </div>
    )
}

export default AppLayout
