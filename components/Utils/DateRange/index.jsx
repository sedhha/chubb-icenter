import React from 'react'
import { DateRangePicker } from 'react-date-range';
import classes from "./DateRange.module.css";
import { BsCalendarWeek } from "react-icons/bs";
export default function CalendarPicker() {
    const [open, setOpen] = React.useState(false);
    const [dates, setDates] = React.useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const onChange = (ranges) => setDates({ ...ranges.selection });

    return (
        <div className={classes.Date}>
            <div className={classes.Calendar}>
                <h4>Date Range</h4>
                <BsCalendarWeek
                    className={open ? classes.calendarOpen : classes.calendarClosed}
                    onClick={() => setOpen(prev => !prev)} />
            </div>
            <div className={classes.DateViewer}>
                {open && <DateRangePicker
                    ranges={[dates]}
                    onChange={onChange}
                />}
            </div>
        </div>
    )
}
