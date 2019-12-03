import React from 'react';

import styles from '~/containers/tickets/css/ticket.module.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default function Tickets (props){
	return (
		<Paper className={styles.root}>
				 <div className={styles.tableWrapper}>
					 <Table stickyHeader aria-label="sticky table">
						 <TableHead>
							 <TableRow>
								 {props.tableCell.map(column=> (
									 <TableCell key={column.id} >
										 {column.label}
									 </TableCell>
								 ))}
							 </TableRow>
						 </TableHead>
						 <TableBody>
								{props.ticketsList.map((row, i) => {
									return  <TableRow key={i}>
														{props.tableCell.map(column => {
															const value = row[column.key];
															return <TableCell key={column.id} >
																				{column.format && typeof value === 'number' ? column.format(value, 2) : column.format(value)}
																			</TableCell>
														})}
													</TableRow>
								})}
						 </TableBody>
					 </Table>
				 </div>
			 </Paper>
		 );
}

