import React from 'react'
import Map from '../Map/Map'
import { Outlet } from 'react-router-dom'
import { useBookMarks } from '../Context/BookMarkListContext'

function BookMarkLayout() {
    const { bookmarks } = useBookMarks()
    return (
        <div className='appLayout'>
            <div className="sidebar">
                <Outlet />
            </div>
            <Map marcerLocations={bookmarks} />
        </div>
    )
}

export default BookMarkLayout
