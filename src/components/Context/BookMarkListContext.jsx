import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import useFetcher from '../../Hooks/useFatch';
import toast from 'react-hot-toast';
import axios from 'axios';

const BookMarkContext = createContext()
const BASE_URL = "http://localhost:5000/bookmarks"
function BookMarkProvaider({ children }) {
    const [currentBookMark, setCurrentBookMark] = useState(null)
    const [isLoadingCurrBookMark, setIsLoadingCurrBookMark] = useState(false)

    const [idBookMark, setIdBookMark] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination")
    const room = JSON.parse(searchParams.get("options"))?.room;

    const [bookmarks, setBookmarks] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // const { data: bookmarks, isLoading } = useFetcher(`${BASE_URL}`)

    useEffect(() => {
        async function fetchBookmarkList() {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`${BASE_URL}`)
                setBookmarks(data)
                console.log(data);

                setIsLoading(false)
            }
            catch (error) {
                toast.error(error.message)
                setIsLoading(false)
            } finally {
                setIsLoading(false)
            }
        }
        fetchBookmarkList()
    }, [])


    async function getBookMark(id) {
        setIsLoadingCurrBookMark(true)
        setCurrentBookMark(null)
        try {
            const { data } = await axios.get(`${BASE_URL}/${id}`)
            setCurrentBookMark(data)
            setIsLoadingCurrBookMark(false)
        }
        catch (error) {
            toast.error(error.message)
            setIsLoadingCurrBookMark(false)
        }
    }

    async function createBookMark(newBookMark) {
        setIsLoadingCurrBookMark(true)
        try {
            const { data } = await axios.post(`${BASE_URL}`, newBookMark)
            setCurrentBookMark(data)
            setBookmarks((prev) => [...prev, data])
            console.log(data);
            // setIsLoadingCurrBookMark(false)
        }
        catch (error) {
            toast.error(error.message)
            // setIsLoadingCurrBookMark(false)
        } finally {
            setIsLoadingCurrBookMark(false)

        }
    }

    async function deleteBookMark(id) {
        setIsLoadingCurrBookMark(true)
        try {
            await axios.delete(`${BASE_URL}/${id}`)
            setBookmarks((prev) => prev.filter((item) => item.id !== id))
            setIsLoadingCurrBookMark(false)
        }
        catch (error) {
            toast.error(error.message)
            setIsLoadingCurrBookMark(false)
        }
    }




    return (<BookMarkContext.Provider
        value={{
            isLoading,
            currentBookMark,
            isLoadingCurrBookMark,
            bookmarks,
            setIdBookMark,
            getBookMark,
            createBookMark,
            deleteBookMark
        }}
    >{children}</BookMarkContext.Provider>

    )
}

export default BookMarkProvaider
export function useBookMarks() {
    return useContext(BookMarkContext)
}