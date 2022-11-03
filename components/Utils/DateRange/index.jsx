import React from 'react'
import { DateRangePicker } from 'react-date-range';
import classes from "./DateRange.module.css";
import { BsCalendarWeek } from "react-icons/bs";
export default function CalendarPicker({
    calendarOpen,
    toggleOpen,
    startDate,
    endDate,
    onChangeHandler
}) {

    const dates = {
        startDate: new Date(startDate ?? new Date()),
        endDate: new Date(endDate ?? new Date()),
        key: 'selection',
    };
    const onChange = (ranges) => onChangeHandler?.({
        startDate: new Date(ranges.selection.startDate).toISOString(),
        endDate: new Date(ranges.selection.endDate).toISOString(),
    }) ?? setDates({ ...ranges.selection });

    return (
        <div className={classes.Date}>
            <div className={classes.Calendar}>
                <h4>Date Range</h4>
                <BsCalendarWeek
                    className={calendarOpen ? classes.calendarOpen : classes.calendarClosed}
                    onClick={() => toggleOpen()} />
            </div>
            <div className={classes.DateViewer}>
                {calendarOpen && <DateRangePicker
                    ranges={[dates]}
                    onChange={onChange}
                />}
            </div>
        </div>
    )
}
