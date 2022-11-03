import React from 'react'
import classes from "./Insurances.module.css";
import InsuranceCard from "./InsuranceCard/Card";

export default function Insurances() {
    return (
        <div className={classes.Insurances}>
            <InsuranceCard />
            <InsuranceCard />
            <InsuranceCard />
            <InsuranceCard />

        </div>
    )
}
