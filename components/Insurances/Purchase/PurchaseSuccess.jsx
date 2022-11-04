import React from 'react'
import { useDispatch } from 'react-redux';
import { setDisclosures, setPurchaseSuccess, setShowPurchase, setShowTerms } from '../../../redux/slices/custom.slices';
import classes from "./Purchase.module.css"


export default function Terms() {
    const dispatch = useDispatch();
    return (
        <div className={classes.Purchase}>
            <div className={classes.RowWrapper}>
                <h1 className={classes.PremiumAndPaymentDetails}>
                    Purchase Success
                </h1>
            </div>
            <div className={classes.InsuranceForm}>


            </div>
            <label>Your Purchase was successful!</label>
            <div className={classes.RowWrapperEnd}>
                <button className={classes.Button} onClick={() => {
                    dispatch(setPurchaseSuccess(false))
                    dispatch(setShowPurchase(false))
                    dispatch(setShowTerms(false))
                }}>Close Window</button>
            </div>
        </div>


    )
}
