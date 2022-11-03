import React from 'react'
import classes from "./Filter.module.css";
import MultiSelect from "../Utils/Dropdown/Multi-Select";
import SingleSelect from "../Utils/Dropdown/Single-Select";
import CalendarPicker from '../Utils/DateRange';

const insuranceCategories = [
    {
        label: 'Accident',
        value: 'acc',
    },
    {
        label: 'Business',
        value: 'bus',
    },
    {
        label: 'Cyber',
        value: 'cyb',
    },
    {
        label: 'Gadget',
        value: 'gad',
    },
    {
        label: 'Hospital',
        value: 'hos',
    },
    {
        label: 'Travel',
        value: 'tra',
    },
    {
        label: 'Valuables',
        value: 'val',
    }
];

const countries = [
    {
        label: 'Global',
        value: 'sg-01',
    },
    {
        label: 'Singapore',
        value: 'sg',
    },
    {
        label: 'United States',
        value: 'sg-02',
    },
    {
        label: 'India',
        value: 'sg-03',
    },
    {
        label: 'United Kingdom',
        value: 'sg-04',
    },
    {
        label: 'Brazil',
        value: 'sg-05',
    },
    {
        label: 'Germany',
        value: 'sg-06',
    }
];
const paymentTypes = [
    {
        label: 'One Time',
        value: 'ot'
    },
    {
        label: 'Monthly',
        value: 'mt'
    },
    {
        label: 'Quarterly',
        value: 'qt'
    },
    {
        label: 'Anually',
        value: 'an'
    }
];
const insuranceOptions = [
    {
        label: 'Basic',
        value: '1'
    },
    {
        label: 'Standard',
        value: '2'
    },
    {
        label: 'Ultimate',
        value: '3'
    },
    {
        label: 'Custom',
        value: '4'
    }
];

const customCoverageOptions = [
    {
        label: '$500000',
        value: 500000
    },
    {
        label: '$1000000',
        value: 1000000
    }
];
export default function Filter() {
    const [fromPrice, setFromPrice] = React.useState(1000);
    const [toPrice, setToPrice] = React.useState(10000);
    const [paymentType, setPaymentType] = React.useState('ot');


    return (
        <div className={classes.Filter}>
            <h1 className={classes.FilterHeader}>Filters</h1>
            <div className={classes.InsuranceTypes}>
                <SingleSelect options={insuranceCategories} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance Types
                    </div>
                } />
                <CalendarPicker />
                <MultiSelect options={countries} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance locations
                    </div>
                } />
                <SingleSelect options={insuranceOptions} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance Package
                    </div>
                } />
                <div className={classes.PriceRangePicker}>
                    <h4 className={classes.PriceRangeHeader}>
                        Payment Type
                    </h4>
                    <li className={classes.PaymentType}>
                        {
                            paymentTypes.map(
                                item => <ul
                                    className={
                                        item.value === paymentType ?
                                            classes.ActiveLabel :
                                            classes.InActiveLabel}
                                    key={item.value}
                                    onClick={() => setPaymentType(item.value)}
                                >
                                    {item.label}
                                </ul>)
                        }
                    </li>
                    <h4 className={classes.PriceRangeHeader}>
                        Price Range
                    </h4>

                    <div className={classes.PriceIndicator}>
                        <label className={classes.CurrencyLabel}>
                            Min Amount ($)
                        </label>
                        <input type='number'
                            className={classes.InputBox}
                            value={fromPrice}
                            onChange={e => setFromPrice(+e.target.value)} />
                    </div>
                    <div className={classes.PriceIndicator}>
                        <label className={classes.CurrencyLabel}>
                            Max Amount ($)
                        </label>
                        <input type='number'
                            className={classes.InputBox}
                            value={toPrice}
                            onChange={e => setToPrice(+e.target.value)} />
                    </div>
                </div>

                <button className={classes.Button}>
                    Create My Custom Combination
                </button>

            </div>
        </div>
    )
}
