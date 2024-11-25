import React from 'react'
import { useSearchParams } from 'react-router-dom'

function useUrlLocation() {
    const [searchParams, setSearchParams] = useSearchParams()
    const lng = searchParams.get("lng")
    const lat = searchParams.get("lat")
    return [lat, lng]
}

export default useUrlLocation
