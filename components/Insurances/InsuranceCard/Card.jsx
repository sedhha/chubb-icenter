import React from 'react'
import classes from "./InsuranceCard.module.css"
import { AiFillCheckCircle } from "react-icons/ai"
export default function Card({
    insuranceName,
    insuranceType,
    coverageAmount,
    frequency,
    premiumTax,
    premiumAmount,
    coreIncluded
}) {
    return (
        <div className={classes.InsuranceCard}>
            <h1 className={classes.InsuranceName}>Name: {insuranceName ?? 'Business'}</h1>
            <div className={classes.CoverageDetails}>
                <h2 className={classes.InsuranceDetails}>Type: {insuranceType ?? 'Standard'}</h2>
                <h2 className={classes.InsuranceDetails}>Amount: {coverageAmount ?? 'S$20,0000'}</h2>
            </div>
            <div>
                <h1 className={classes.PremiumAndPaymentDetails}>
                    Premium and Payment Details
                </h1>
                <h2 className={classes.PremiumFrequency}>
                    Frequency: {frequency ?? 'Monthly'}
                </h2>
                <div className={classes.PremiumBox}>
                    <h4 className={classes.PremiumContent}>
                        Amount: {premiumAmount ?? 'S$12.00'}
                    </h4>
                    <h4 className={classes.PremiumContent}>
                        Tax: {premiumTax ?? 'S$0.20'}
                    </h4>
                    <h4 className={classes.PremiumContent}>
                        Total: {`S$${(premiumAmount ?? 12.00) + (premiumTax ?? 0.20)}`}
                    </h4>
                </div>
            </div>
            <div className={classes.ActionCenter}>
                <div className={classes.CoreIncluded}>
                    <AiFillCheckCircle className={coreIncluded ? classes.Active : classes.InActive} />
                    <label className={classes.Label}>Core Included</label>
                </div>
                <div className={classes.ButtonGroup}>
                    <button className={classes.Button}>Terms</button>
                    <button className={classes.Button}>Purchase</button>
                </div>
            </div>
        </div>
    )
}
