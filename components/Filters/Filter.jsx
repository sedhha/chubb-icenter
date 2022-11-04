import React from 'react'
import classes from "./Filter.module.css";
import MultiSelect from "../Utils/Dropdown/Multi-Select";
import SingleSelect from "../Utils/Dropdown/Single-Select";
import CalendarPicker from '../Utils/DateRange';
import { useDispatch, useSelector } from 'react-redux';
import { setDates, setFromPrice, toggleOpen, setPaymentType, setToPrice, setType, setLocation, setInsurancePackage, fetchOffersByFilter } from '../../redux/slices/filter.slices';

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
        label: 'Daily',
        value: '4'
    },
];
export default function Filter() {
    const { minAmount,
        maxAmount,
        paymentType,
        type,
        calendarOpen,
        startDate,
        endDate,
        location,
        insurancePackage
    } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    return (
        <div className={classes.Filter}>
            <div className={classes.Apply}>
                <h1 className={classes.FilterHeader}>Filters</h1>
                <button className={classes.ButtonSmall} onClick={() => dispatch(fetchOffersByFilter())}>Apply Filters</button>
            </div>
            <div className={classes.InsuranceTypes}>
                <SingleSelect options={insuranceCategories} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance Type
                    </div>
                }
                    onChangeHandler={value => dispatch(setType(value))}
                    value={type}
                />
                <CalendarPicker
                    calendarOpen={calendarOpen}
                    toggleOpen={() => dispatch(toggleOpen())}
                    startDate={startDate}
                    endDate={endDate}
                    onChangeHandler={(dates) => dispatch(setDates(dates))}
                />
                <SingleSelect options={countries} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance locations
                    </div>
                }
                    onChangeHandler={value => dispatch(setLocation(value))}
                    value={location}
                />
                <MultiSelect options={insuranceOptions} placeholder={
                    <div className={classes.Placeholder}>
                        Insurance Package
                    </div>
                }
                    value={insurancePackage}
                    onChangeHandler={value => dispatch(setInsurancePackage(value))}
                />
                <div className={classes.PriceRangePicker}>
                    <h4 className={classes.PriceRangeHeader}>
                        Payment Type
                    </h4>
                    <li className={classes.PaymentType}>
                        {
                            paymentTypes.map(
                                item => <ul
                                    className={
                                        item.value === paymentType.value ?
                                            classes.ActiveLabel :
                                            classes.InActiveLabel}
                                    key={item.value}
                                    onClick={() => dispatch(setPaymentType(item))}
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
                            value={minAmount}
                            onChange={e => dispatch(setFromPrice(+e.target.value))} />
                    </div>
                    <div className={classes.PriceIndicator}>
                        <label className={classes.CurrencyLabel}>
                            Max Amount ($)
                        </label>
                        <input type='number'
                            className={classes.InputBox}
                            value={maxAmount}
                            onChange={e => dispatch(setToPrice(+e.target.value))} />
                    </div>
                </div>

                <button className={classes.Button}>
                    Create My Custom Combination
                </button>

            </div>
        </div>
    )
}
