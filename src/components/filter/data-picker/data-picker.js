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
  
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={'2014-08-18T21:11:54'}
          onChange={()=>{}}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
	);
}

