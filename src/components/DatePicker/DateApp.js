import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';

export const DateApp = (props) => {
    return (
        <DatePicker id="example-datepicker" value={props.value} onChange={props.handleChange} />
    );
}
