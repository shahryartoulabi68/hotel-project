import React, { createContext, useContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetcher from '../../Hooks/useFatch';
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';

const HotelContext = createContext()
const BASE_URL = "http://localhost:5000/hotels"

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState({})
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const destination = searchParams.get("destination")
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetcher(BASE_URL,
    `name_like=${destination || ""}&accommodates_gte${room || 1}`)

    async function getHotele(id) {
      setIsLoadingCurrHotel(true)
      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`)
        setCurrentHotel(data)
        setIsLoadingCurrHotel(false)
      }
      catch (error) {
        toast.error(error.message)
        setIsLoadingCurrHotel(false)
      }
    }

  return (<HotelContext.Provider value={{ isLoading, hotels, isLoadingCurrHotel, currentHotel, getHotele }}>{children}</HotelContext.Provider>

  )
}

export default HotelsProvider
export function useHotels() {
  return useContext(HotelContext)
}