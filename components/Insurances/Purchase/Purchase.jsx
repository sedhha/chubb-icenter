import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setPurchaseSuccess, setShowPurchase } from '../../../redux/slices/custom.slices';
import { setLoading } from '../../../redux/slices/filter.slices';
import classes from "./Purchase.module.css"



export default function Terms() {

    const { disclosures, name, email } = useSelector(state => state.custom);
    const { loading } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const confirmPurchase = async () => {
        dispatch(setShowPurchase(false));
        dispatch(setLoading(true));
        const geoData = await fetch("https://ipapi.co/json/").then(res => res.json().then(
            data => data));

        await fetch("/api/purchase", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, geoData })
        }).then(res => res.json().then(data => data))
        dispatch(setLoading(false));
        dispatch(setPurchaseSuccess(true))

    }

    return (
        <div className={classes.Purchase}>
            <div className={classes.RowWrapper}>
                <h1 className={classes.PremiumAndPaymentDetails}>
                    Purchase Insurance
                </h1>
                <AiFillCloseCircle className={classes.CloseButton} onClick={() => setShowPurchase(false)} />
            </div>
            <div className={classes.InsuranceForm}>
                <div className={classes.FormRow}>
                    <label>Name: </label>
                    <input className={classes.InputBox} type='text' />
                </div>
                <div className={classes.FormRow}>
                    <label>Email: </label>
                    <input className={classes.InputBox} type='email' />
                </div>

            </div>
            <div className={classes.Disclosures}>
                <div className={classes.DisclosureRow}>
                    <h1 className={classes.DisplayName}>Terms and Conditions</h1>
                </div>
                {disclosures.disclosures.map(element => {
                    return <div
                        id={element._id}
                        className={classes.DisclosureContainer}>

                        <article>{element.html_description}</article>
                        <div className={classes.Column}>
                            {element.disclosure_links.map(item => <a key={item.url_id} target="_blank" href={item.url}>
                                {item.url_title}</a>)}
                        </div>


                    </div>
                })}
                <div className={classes.RowWrapperEnd}>
                    <button className={classes.Button} onClick={confirmPurchase}>Confirm Purchase</button>
                </div>
            </div>
        </div>


    )
}
