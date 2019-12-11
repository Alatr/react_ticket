import React, { PureComponent } from 'react';

import styles from '~/containers/tickets/css/ticket.module.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';


export default class extends PureComponent{
	render(){
		let {tableCell, ticketsList} = this.props
	
		let tableCellView = tableCell.map(column => {
			return 	<TableCell key={column.id} >
								{column.label}
							</TableCell>
		});
		let tableBody = ticketsList.map((row, i) => {
			return  <TableRow key={i}>
								{tableCell.map(column => {
									const value = row[column.key];
									console.log('tableBody  TableCell redder');
									return <TableCell key={column.id} >
														{column.format && typeof value === 'number' ? column.format(value, 2) : column.format(value)}
													</TableCell>
								})}
							</TableRow>
		})
	return (
		<Paper className={styles.root}>
				 <div className={styles.tableWrapper}>
					 <Table stickyHeader aria-label="sticky table">
						 <TableHead>
							 <TableRow>
								 {tableCellView}
							 </TableRow>
						 </TableHead>
						 <TableBody>
							 {tableBody}
						 </TableBody>
						 <TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
										colSpan={3}
										count={10}
										rowsPerPage={10}
										page={10}
										SelectProps={{
											inputProps: { 'aria-label': 'rows per page' },
											native: true,
										}}
										onChangePage={'handleChangePage'}
										onChangeRowsPerPage={'handleChangeRowsPerPage'}
										ActionsComponent={'TablePaginationActions'}
									/>
								</TableRow>
							</TableFooter>
					 </Table>
				 </div>
			 </Paper>
		 );
	}
}

