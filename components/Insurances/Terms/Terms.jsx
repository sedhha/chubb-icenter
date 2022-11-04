import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { setShowPurchase, setShowTerms } from '../../../redux/slices/custom.slices';
import classes from "./Terms.module.css"

const dependentMap = {
    1: 'Basic',
    2: 'Standard',
    3: 'Ultimate'
};
export default function Terms() {
    const { tempTerms, tempBenefits } = useSelector(state => state.custom);
    const dispatch = useDispatch();

    return (
        <div className={classes.Terms}>
            <div className={classes.RowWrapper}>
                <h1 className={classes.PremiumAndPaymentDetails}>
                    Coverage Terms
                </h1>
                <AiFillCloseCircle className={classes.CloseButton} onClick={() => dispatch(setShowTerms(false))} />
            </div>
            {tempTerms.length !== 0 &&
                <React.Fragment>

                    <div>
                        <h2 className={classes.MinHeaders}>
                            Coverage Details
                        </h2>
                        <table className={classes.CoverageAmount}>
                            <thead>
                                <tr>
                                    <th>Coverage ID</th>
                                    <th>Coverage Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempTerms.map(item => {
                                    const { coverage_id } = item;
                                    const subEntities = item.value.map(subEntity => <tr key={subEntity.name}>
                                        <td>{coverage_id}</td>
                                        <td>{subEntity.name}</td>
                                        <td>{subEntity.description}</td>
                                    </tr>)
                                    return <React.Fragment key={coverage_id}>{subEntities}</React.Fragment>
                                })}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            }
            {tempBenefits.length !== 0 &&
                <React.Fragment>
                    <div>
                        <h2 className={classes.MinHeaders}>
                            Plan and Amount Details
                        </h2>
                        <table className={classes.CoverageAmount}>
                            <thead>
                                <tr>
                                    <th>Coverage ID</th>
                                    <th>Coverage Name</th>
                                    <th>For your spouse</th>
                                    <th>For your dependent(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tempBenefits.map(item => {
                                    const { coverage_id, name, offer_id } = item;
                                    const idMap = item.sub_benefits.reduce((acc, curr) => {
                                        acc[curr.id] = curr.amount;
                                        if (curr.id !== '1.1' || curr.id !== '1.2') console.log("Unknwon curr id");
                                        return acc;
                                    }, {})
                                    return <tr key={coverage_id}>
                                        <td>{coverage_id}</td>
                                        <td>{name} - {dependentMap[offer_id]}</td>
                                        <td>{idMap['1.1'] ?? <ImCross className={classes.CloseButton} />}</td>
                                        <td>{idMap['1.2'] ?? <ImCross className={classes.CloseButton} />}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </React.Fragment>
            }
            <div className={classes.RowWrapperEnd}>
                <button className={classes.Button} onClick={() => dispatch(setShowPurchase(true))}>Purchase</button>
            </div>
        </div>

    )
}
