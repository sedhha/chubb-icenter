import React from 'react'
import classes from "./Insurances.module.css";
import InsuranceCard from "./InsuranceCard/Card";
import FullWidthSpinner from '../Utils/Spinner/FullWidthSpinner';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Utils/Popup/Popup';
import Terms from './Terms/Terms';
import Purchase from './Purchase/Purchase';
import PurchaseSuccess from "./Purchase/PurchaseSuccess"
import { fetchOffersByFilter } from '../../redux/slices/filter.slices';


export default function Insurances() {
    const { loading } = useSelector(state => state.filter)
    const { cards } = useSelector(state => state.cards)
    const { showTerms, showPurchase, purchaseSuccess } = useSelector(state => state.custom)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchOffersByFilter())
    }, [])
    return (
        <div className={classes.Container}>
            {loading && <FullWidthSpinner />}
            {cards.length === 0 && (
                <div className={classes.NoResults}>
                    <img src={'/no-results.svg'} className={classes.NoResult} />
                    <label className={classes.Label}>No results found! Stars are not aligned. Try resetting filters :/</label>
                </div>
            )
            }
            {showTerms && (
                <Popup>
                    <Terms />
                </Popup>
            )}
            {showPurchase && (
                <Popup>
                    <Purchase />
                </Popup>
            )}
            {purchaseSuccess && (
                <Popup>
                    <PurchaseSuccess />
                </Popup>
            )}
            <div className={classes.Insurances}>
                {cards.map((card, index) => <InsuranceCard {...card} key={card.insuranceName + card.insuranceType + index} />)}

            </div>

        </div>


    )
}
