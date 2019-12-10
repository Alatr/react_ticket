import React from 'react';

import styles from './css/select.module.css';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function DataPickerView (props){
  const handleDateChange = date => {
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    //console.log(`${Y}-${M}-${D}`, props.getKey);
    
    props.onChange([`${Y}-${M}-${D}`, props.getKey]);
  };
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant={props.variant}
          format={props.format}
          margin="normal"
          id={props.id}
          label={props.label}
          value={props.defaultValue}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
	);
}

