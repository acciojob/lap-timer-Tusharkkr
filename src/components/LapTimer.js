import React, { useEffect, useRef, useState } from "react";

const LapTimer = () => {

    let [sec, setSec] = useState('00')
    let [min, setMin] = useState('00')
    let [hour, setHour] = useState('00')
    let [lap, setLap] = useState([])

    let startRef = useRef()

    function handleStart() {
        startTime()
    }

    function startTime() {

        startRef.current = setInterval(() => {

            setSec(prev => {
                if (prev < 9) {
                    return `0${+prev + +1}`
                } else if (prev < 60) {
                    return +prev + +1
                } else {
                    setSec('00')
                    setMin(prev => {
                        if (prev < 9) {
                            return `0${+prev + +1}`
                        } else if (prev < 60) {
                            return +prev + +1
                        } else {
                            setMin('00')
                            setHour(prev => {
                                if (prev < 9) {
                                    return `0${+prev + +1}`
                                } else if (prev < 24) {
                                    return +prev + +1
                                }
                            })
                        }
                    })
                }
            })
        }, 1)
    }


    function handleStop() {
        clearInterval(startRef.current)
    }

    function handleReset() {
        clearTimeout(startRef.current)
        setLap([])
        setSec('00')
        setMin('00')
        setHour('00')
    }

    function handleLap() {
        let x = `${hour} : ${min} : ${sec}`
        setLap([...lap, x])
    }

    return (
        <div>
            <div id="root">{hour} : {min} : {sec}</div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleLap}>Lap</button>
            <button onClick={handleReset}>Reset</button>
            <ul>
            {lap.map((value, index) => (
                <li key={index}>{value}</li>
            ))}
            </ul>
        </div>
    )
}

export default LapTimer
