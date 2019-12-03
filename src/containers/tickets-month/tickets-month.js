import React from 'react';
import withStore from '~/hocs/withStore';
import rootStore from '~/store';
import Spinner from '~/components/errors/spinner';
import TicketsView from '~/components/table';



class TicketsMonth extends React.Component{
	componentDidMount(){
		rootStore.monthTickets.load();
		
	}
   render(){
		let monthTicketsStore = this.props.stores.monthTickets;
		let ticketsListDetails = monthTicketsStore.ticketsList.map(field => {
			return {...field}
		});
		
		 return (rootStore.monthTickets.loading) ? 
		 	<Spinner/> :
		  <TicketsView tableCell={monthTicketsStore.tableCell}
		 											ticketsList={ticketsListDetails}
		 				/>;
   }
}

export default withStore(TicketsMonth);
