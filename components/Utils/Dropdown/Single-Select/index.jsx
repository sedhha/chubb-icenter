import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from "../Dropdown.module.css";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options, placeholder, onChangeHandler, value }) {
    return (
        <div className={classes.SelectContainer}>
            <h2 className={classes.SelectLabel}>{placeholder}</h2>
            <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={options}
                placeholder={placeholder ?? 'Select all that apply.'}
                onChange={(newValue) => onChangeHandler?.(newValue) ?? console.log(newValue)}
                value={value ?? { label: 'Unknown', value: 'uk' }}
            />
        </div>
    );
}