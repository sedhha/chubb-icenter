import React from 'react'
import classes from "./Filter.module.css";
import MultiSelect from "../Utils/Multi-Select";
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
export default function Filter() {
    const [fromPrice, setFromPrice] = React.useState(1000);
    const [toPrice, setToPrice] = React.useState(10000);
    const [paymentType, setPaymentType] = React.useState('ot');

    return (
        <div className={classes.Filter}>
            <h1 className={classes.FilterHeader}>Filters</h1>
            <div className={classes.InsuranceTypes}>
                <MultiSelect options={insuranceCategories} placeholder={
                    <div className={classes.Placeholder}>
                        Select Insurance types you're looking for
                    </div>
                } />
                <CalendarPicker />
                <MultiSelect options={countries} placeholder={
                    <div className={classes.Placeholder}>
                        Select Insurance locations
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
                    <br />
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
            </div>
        </div>
    )
}
