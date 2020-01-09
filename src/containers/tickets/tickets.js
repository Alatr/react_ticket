import React from 'react';
import withStore from '~/hocs/withStore';
import rootStore from '~/store';
import Spinner from '~/components/errors/spinner';
import TicketsView from '~/components/table';


class Tickets extends React.Component{
	componentDidMount(){
		rootStore.tickets.load();
		
	}
	render(){
			let ticketsStore = this.props.stores.tickets;
			let ticketsListDetails = ticketsStore.ticketsList.map(field => {
				return {...field}
			});
			console.log('render');
			
			 return (rootStore.tickets.loading) ? 
				<Spinner/> :
				<TicketsView tableCell = {ticketsStore.tableCell}
										 ticketsList={ticketsListDetails}
										 ticketsLength={ticketsStore.ticketsLength}
										 selectItems={ticketsStore.tablePaginationSattings.selectItems}
										 numberRows={ticketsStore.tablePaginationSattings.numberRows}
										 page={ticketsStore.tablePaginationSattings.page}
				/>;
		 
   }
}

export default withStore(Tickets);
