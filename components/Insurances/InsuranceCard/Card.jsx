import React from 'react'
import classes from "./InsuranceCard.module.css"
import { ImCross, ImCheckmark } from "react-icons/im"
import { useDispatch } from 'react-redux';
import { setShowTerms, setTempTerms, setTempBenefits, setShowPurchase } from '../../../redux/slices/custom.slices';
const CheckMark = (enabled) => enabled ? <ImCheckmark className={classes.Active} /> : <ImCross className={classes.InActive} />
const dummyCAmounts = [
    {
        "amount": 100000,
        "insurance_type": "MI"
    },
    {
        "amount": 50000,
        "insurance_type": "SP"
    },
    {
        "amount": 25000,
        "insurance_type": "DP"
    }
];
const dummyCoveragePricing = [
    {
        "coverage": {
            "coverage_id": "ACC001",
            "level": "1",
            "name": "Accidental Death",
            "amount": 100000,
            "core_coverage": true,
            "insured_type": {
                "id": "1",
                "name": "MainInsuredAndFamily"
            }
        },
        "cost": {
            "premium": 5,
            "tax": 0.35,
            "total": 5.35,
            "currency": {
                "abbreviation": "SGD",
                "code": "SGD",
                "display": "symbol",
                "digitsInfo": "1.2-2"
            }
        }
    },
    {
        "coverage": {
            "coverage_id": "ACC002",
            "level": "1",
            "name": "Permanent Disability",
            "amount": 100000,
            "core_coverage": true,
            "insured_type": {
                "id": "1",
                "name": "MainInsuredAndFamily"
            }
        },
        "cost": {
            "premium": 5,
            "tax": 0.35,
            "total": 5.35,
            "currency": {
                "abbreviation": "SGD",
                "code": "SGD",
                "display": "symbol",
                "digitsInfo": "1.2-2"
            }
        }
    },
    {
        "coverage": {
            "coverage_id": "ACC003",
            "level": "1",
            "name": "Temporary Disability",
            "amount": 50000,
            "core_coverage": false,
            "insured_type": {
                "id": "1",
                "name": "MainInsuredAndFamily"
            }
        },
        "cost": {
            "premium": 5,
            "tax": 0.35,
            "total": 5.35,
            "currency": {
                "abbreviation": "SGD",
                "code": "SGD",
                "display": "symbol",
                "digitsInfo": "1.2-2"
            }
        }
    },
    {
        "coverage": {
            "coverage_id": "ACC004",
            "level": "1",
            "name": "Medical Expenses",
            "amount": 10000,
            "core_coverage": false,
            "insured_type": {
                "id": "1",
                "name": "MainInsuredAndFamily"
            }
        },
        "cost": {
            "premium": 5,
            "tax": 0.35,
            "total": 5.35,
            "currency": {
                "abbreviation": "SGD",
                "code": "SGD",
                "display": "symbol",
                "digitsInfo": "1.2-2"
            }
        }
    }
]

const frequencyMap = {
    12: 'Monthly',
    4: 'Quarterly',
    1: 'Anually',
    100: 'One Time'
};
export default function Card({
    insuranceName,
    insuranceType,
    frequency,
    premiumTax,
    premiumAmount,
    premiumTotal,
    coverage_amounts,
    coverage_pricing,
    coverage_details,
    benefits,
    for_type,
    discount
}) {
    const cAmounts = coverage_amounts.coverage_amounts ?? [...dummyCAmounts];
    const cPricings = coverage_pricing ?? [...dummyCoveragePricing];
    const forTypeLower = for_type?.toLowerCase() ?? '';
    const familyIncluded = forTypeLower.includes("family");
    const selfIncluded = forTypeLower.includes("main");
    const dispatch = useDispatch();
    return (
        <div className={classes.InsuranceCard}>
            <h1 className={classes.InsuranceName}>Name: {insuranceName ?? 'Business'}</h1>
            <div className={classes.CoverageDetails}>
                <div className={classes.DiscountContainer}>
                    <label className={classes.LabelB}>Type:</label>
                    <label className={classes.Label}>{insuranceType ?? 'Standard'}</label>
                </div>
                <div className={classes.DiscountContainer}>
                    {CheckMark(discount)}
                    <label className={classes.LabelB}>Discount</label>
                    {discount ? <label className={classes.Label}>S$ 2000</label> : null}
                </div>
            </div>

            {cAmounts.length !== 0 &&
                <React.Fragment>
                    <h1 className={classes.PremiumAndPaymentDetails}>
                        Coverage Details
                    </h1>
                    <table className={classes.CoverageAmount}>
                        <thead>
                            <tr>
                                <th>Insurance Type</th>
                                <th>Amount</th>

                            </tr>
                        </thead>
                        <tbody>
                            {cAmounts.map(item => <tr key={item.insurance_type}>
                                <td>{item.insurance_type}</td>
                                <td>S$ {item.amount.toLocaleString("en-US")}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </React.Fragment>
            }

            <h1 className={classes.PremiumAndPaymentDetails}>
                Premium and Payment Details
            </h1>
            <div className={classes.PremiumBox}>
                <div className={classes.DiscountContainer}>
                    <label className={classes.LabelB}>Frequency:</label>
                    <label className={classes.Label}>{frequencyMap[frequency] ?? 'Monthly'}</label>
                </div>
                <div className={classes.DiscountContainer}>
                    <label className={classes.LabelB}>Amount:</label>
                    <label className={classes.Label}>{`S$${premiumAmount ?? '10.00'}`}</label>
                </div>
            </div>
            <div className={classes.PremiumBox}>
                <div className={classes.DiscountContainer}>
                    <label className={classes.LabelB}>Tax:</label>
                    <label className={classes.Label}>{`S$${premiumTax ?? '10.20'}`}</label>
                </div>
                <div className={classes.DiscountContainer}>
                    <label className={classes.LabelB}>Total:</label>
                    <label className={classes.Label}>{`S$${(premiumTotal ?? '12.20')}`}</label>
                </div>
            </div>
            {cPricings.length !== 0 &&
                <React.Fragment>
                    <table className={classes.CoverageAmount}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount Insured</th>
                                <th>Total Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cPricings.map(item => <tr key={item.coverage.coverage_id}>
                                <td>{item.coverage.name}</td>
                                <td>S$ {item.coverage.amount.toLocaleString("en-US")}</td>
                                <td>S$ {item.cost.total.toLocaleString("en-US")}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </React.Fragment>
            }

            <div className={classes.ActionCenter}>
                <div className={classes.CoreIncluded}>
                    {CheckMark(selfIncluded)}
                    <label className={classes.Label}>Self</label>
                </div>
                <div className={classes.CoreIncluded}>
                    {CheckMark(familyIncluded)}
                    <label className={classes.Label}>Family</label>
                </div>

            </div>
            <div className={classes.ButtonGroup}>
                <button className={classes.Button} onClick={() => {
                    dispatch(setTempTerms(coverage_details));
                    dispatch(setTempBenefits(benefits));
                    dispatch(setShowTerms(true));

                }}>Terms</button>
                <button className={classes.Button} onClick={() => dispatch(setShowPurchase(true))}>Purchase</button>
            </div>
        </div>
    )
}
