import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

function Loader() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <span>Loading...</span>
            <LoaderIcon />
        </div>
    )
}

export default Loader
