import React from 'react'
import { useBookMarks } from '../Context/BookMarkListContext'
import Loader from '../Loader/Loader'
import ReactCountryFlag from 'react-country-flag'
import { Link } from 'react-router-dom'
import { HiTrash } from "react-icons/hi"




function BookMark() {
    const { isLoading, bookmarks, currentBookMark, deleteBookMark } = useBookMarks()

    const handleDelete = async (e, id) => {
        e.preventDefault()
        await deleteBookMark(id)
    }

    if (isLoading) return <Loader />
    console.log(bookmarks);

    return (
        <div>
            <h2>BookMarcList</h2>
            <div className="bookmarkList">
                {bookmarks.map((item) => {
                    return <Link key={item.id} to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
                        <div className={`bookmarkItem ${item.id === currentBookMark?.id ? "current-bookmark" : ""}`}>
                            <div>
                                <ReactCountryFlag svg countryCode={item.countryCode} />
                                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                                <span>{item.country}</span>
                            </div>
                            <HiTrash className="trash" onClick={(e) => handleDelete(e, item.id)} />
                        </div>
                    </Link>
                })}
            </div>

        </div>
    )
}

export default BookMark
