import React, { useEffect, useState } from 'react'
import "./Alert.css"

const Alert = ({ alert }) => {

    const [types, setTypes] = useState("");
    const [typeError, setTypeError] = useState(false);

    useEffect(() => {
        if (alert?.type === "success") {
            setTypes(<i className="ri-check-line"></i>)
            setTypeError(false);
        }
        else {
            setTypes(<i className="ri-close-line"></i>);
            setTypeError(true);
        }
    }, [alert?.type])



    return (
        <>
            {alert && <div className='alertBox' >
                <div className={`alertBoxInner ${typeError ? "errorBox" : "successBox"}`}>
                    <p className={`${typeError ? "error" : ""}`}>{types}</p>
                    <h1>{alert.msg}</h1>
                </div>
            </div>}
        </>
    )
}

export default Alert
