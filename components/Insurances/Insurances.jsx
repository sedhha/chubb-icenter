import React from 'react'
import classes from "./Insurances.module.css";
import InsuranceCard from "./InsuranceCard/Card";
import FullWidthSpinner from '../Utils/Spinner/FullWidthSpinner';

export default function Insurances() {
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <div className={classes.Container}>
            {isLoading && <FullWidthSpinner />}
            <div className={classes.Insurances}>
                <InsuranceCard />
                <InsuranceCard />
                <InsuranceCard />
                <InsuranceCard />
            </div>
        </div>


    )
}
