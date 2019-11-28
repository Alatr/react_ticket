import React from 'react';
import withStore from '~/hocs/withStore';

import styles from '~/containers/tickets/css/ticket.module.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class Tickets extends React.Component{
   render(){
		let ticketsStore = this.props.stores.tickets;
		 return (
			 <Paper className={styles.root}>
				 <div className={styles.tableWrapper}>
					 <Table stickyHeader aria-label="sticky table">
						 <TableHead>
							 <TableRow>
								 {ticketsStore.tableCell.map(column=> (
									 <TableCell key={column.id} >
										 {column.label}
									 </TableCell>
								 ))}
							 </TableRow>
						 </TableHead>
						 <TableBody>
							 {ticketsStore.ticketsList.map((row, i) => {
								 return  <TableRow key={i}>
														{ticketsStore.tableCell.map(column => {
															const value = row[column.key];
															return <TableCell key={column.id} >
																				{column.format && typeof value === 'number' ? column.format(value, 3) : column.format(value)}
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
}

export default withStore(Tickets);
