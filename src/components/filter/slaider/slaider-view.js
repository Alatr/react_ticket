import React from 'react';

import styles from './css/slaider.module.css';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


export default function SelectView (props){
	
	return (
		<>
			<Typography id="range-slider">{props.label}</Typography>
			<Slider
					min={props.min}
					value={props.value}
					max={props.max}
					onChange={props.onChange}
					valueLabelDisplay={props.valueLabelDisplay}
					onChangeCommitted={props.onChangeCommitted}
					aria-labelledby="range-slider"
					valueLabelDisplay={'on'}
			/>
		</>
	);
}

