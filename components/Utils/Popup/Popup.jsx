import React from 'react'
import classes from "./Popup.module.css"
export default function Popup({ children }) {
    return (
        <div className={classes.FullSizePopup}>{children}</div>
    )
}
