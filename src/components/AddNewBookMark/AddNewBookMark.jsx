import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUrlLocation from '../../Hooks/useUrlLocation';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { useBookMarks } from '../Context/BookMarkListContext';

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client"

function AddNewBookMark() {
    const navigate = useNavigate()
    const [lat, lng] = useUrlLocation()
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [isGgeoCodingLoading, setIsGeoCodingLoading] = useState(false)
    const [geoCodingError, setGeoCodingError] = useState(null)

    const { createBookMark } = useBookMarks()

    useEffect(() => {
        if (!lat, !lng) return;
        async function fetchLocationData() {
            setIsGeoCodingLoading(true)
            try {
                const { data } = await axios.get(`${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`)
                if (!data.countryCode) throw new Error("this is a nat country")
                setCityName(data.city || "")
                setCountry(data.countryName || "")
                setCountryCode(data.countryCode)
                setIsGeoCodingLoading(false)
                setGeoCodingError(null)
            }
            catch (error) {
                setGeoCodingError(error.message)
                console.log(error);
            }
            finally {
                setIsGeoCodingLoading(false)
            }
        }
        fetchLocationData()
    }, [lat, lng])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!country || !cityName) return
        const newBookMark = {
            cityName,
            country,
            countryCode,
            latitude: lat,
            longitude: lng,
            host_location: cityName + " " + country,
        }
        await createBookMark(newBookMark)
        navigate("/bookmarks")
    }




    if (isGgeoCodingLoading) return <Loader />
    if (geoCodingError) return <p>{geoCodingError}</p>


    return (
        <div>
            <h2 className=''>BookMark New Location</h2>
            <form className='form' onSubmit={handleSubmit}>
                <div className="formControl">
                    <label htmlFor="cityName">CityName</label>
                    <input
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        type="text"
                        name="cityName"
                        id="cityName"
                    />
                </div>
                <div className="formControl">
                    <label htmlFor="country">Country</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="country"
                        id="country"
                    />
                </div>
                <button onClick={(e) => {
                    e.preventDefault()
                    navigate(-1)
                }} className='btn btn--back'>&larr;Back</button>
                <button
                    className="btn btn--primary"
                >Add</button>
            </form>
        </div>
    )

}

export default AddNewBookMark
