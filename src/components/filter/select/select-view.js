import React from 'react';

import styles from './css/select.module.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function SelectView (props){
  
	return (
		<FormControl className={styles.formControl}>
        <InputLabel id={`${props.id}_demo-simple-select-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${props.id}_demo-simple-select-label`}
          id={`${props.id}"demo-simple-select`}
          value={props.defaultValue}
          onChange={(e)=>{props.onChange([e.target.value, props.getKey])}}
        >
          {props.selectItem.map(el=> <MenuItem key={`${el}1`} value={el}>{el}</MenuItem>)}
        </Select>
      </FormControl>
	);
}

