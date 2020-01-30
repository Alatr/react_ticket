import React from 'react';

import styles from './css/checkbox.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';


export default function SelectView (props){
	
	return (
		<>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={null}
							onChange={props.onChange}
							value={props.id}
							color="primary"
							label={props.label}
						/>
					}
					label={props.label}
				/>
			</FormGroup>
			
		</>
	);
}

