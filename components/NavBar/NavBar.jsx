import React from 'react'
import classes from "./NavBar.module.css";

export default function NavBar() {
    return (
        <header className={classes.Header}>
            <img src={'/logo.png'} className={classes.Logo} />
            <h1 className={classes.HeadTitle}>Insurance Center</h1>
        </header>
    )
}
