import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from "../Dropdown.module.css";

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options, placeholder }) {
    return (
        <div className={classes.SelectContainer}>
            <h2 className={classes.SelectLabel}>{placeholder}</h2>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                placeholder={placeholder ?? 'Select all that apply.'}
            />
        </div>

    );
}