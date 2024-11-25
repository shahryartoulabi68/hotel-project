import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBookMarks } from '../Context/BookMarkListContext'
import Loader from '../Loader/Loader'
import ReactCountryFlag from 'react-country-flag'

function SingleBookMark() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getBookMark, currentBookMark, isLoadingCurrBookMark, bookmarks } = useBookMarks()
    useEffect(() => {
        getBookMark(id)
    }, [id])
    const handleBack = () => {
        navigate(-1)
    }

    if (isLoadingCurrBookMark || !currentBookMark) return <Loader />
    return (
        <div>
            <button onClick={handleBack} className='btn btn--back'>&larr;Back</button>
            <h2>{currentBookMark.cityName}</h2>
            <div className={`bookmarkItem`}>
                <ReactCountryFlag svg countryCode={currentBookMark.countryCode} />
                &nbsp;<strong>{currentBookMark.cityName}</strong>&nbsp;
                <span>{currentBookMark.country}</span>
            </div>
        </div>
    )
}

export default SingleBookMark
