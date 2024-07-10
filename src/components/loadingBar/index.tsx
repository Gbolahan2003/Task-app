'use client'
import React, { useEffect, useState } from 'react'
import './loading.scss'

const ProgressBar = () => {

    const [progess, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 10
            )
        }, 600);

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className='progress-bar-container'>
            <div className='progress-bar' style={{ width: `${progess}%` }}></div>
        </div>
    )

}

export default ProgressBar