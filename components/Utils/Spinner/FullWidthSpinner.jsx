import React from 'react'
import classes from "./Spinner.module.css"
import Spinner from "."
export default function FullWidthSpinner() {
    return (
        <div className={classes.FullWidthSpinner}>
            <Spinner />
        </div>
    )
}
