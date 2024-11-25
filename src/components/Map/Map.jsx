import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useGeoLocation from '../../Hooks/useGeoLocation'
import Loader from '../Loader/Loader'
import useUrlLocation from '../../Hooks/useUrlLocation'

function Map({ marcerLocations }) {
    const [mapCenter, setMapCenter] = useState([50, 4])
    const [lat, lng] = useUrlLocation()

    const { isLoading: isLodingPosition,
        position: geoLocationPosition,
        error, getPosition } = useGeoLocation()

    useEffect(() => {
        if (geoLocationPosition?.lng && geoLocationPosition?.lat) {
            return setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng])
        }
    }, [])

    useEffect(() => {
        if (lat && lng) return setMapCenter([lat, lng])
    }, [lat, lng])

    // console.log([mapCenter]);

    return (<div className='mapContainer'>
        <MapContainer
            className='map'
            center={mapCenter} zoom={6} scrollWheelZoom={true}>
            <button
                className="getLocation"
                onClick={getPosition}
            >{isLodingPosition ? <Loader /> : "Use Your Location"}</button>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            <DetactClick />
            <ChangeCenter position={mapCenter} />
            {
                marcerLocations.map((item) => {
                    return <Marker key={item.id} position={[item.latitude, item.longitude]}>
                        <Popup>
                            {item.host_location}
                        </Popup>
                    </Marker>
                })
            }
        </MapContainer>
    </div>
    )
}

export default Map

function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
}

function DetactClick() {
    const navigate = useNavigate()
    useMapEvent({
        click: e => navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

    })
    return null;
}