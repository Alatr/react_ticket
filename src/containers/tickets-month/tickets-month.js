import React from 'react';
import withStore from '~/hocs/withStore';
import rootStore from '~/store';

import TicketsView from '~/components/tickets-month';



class Tickets extends React.Component{
	componentDidMount(){
		rootStore.monthTickets.load();
		
	}
   render(){
		let monthTicketsStore = this.props.stores.monthTickets;
		console.log(monthTicketsStore.ticketsList);
		
		 return <TicketsView tableCell={monthTicketsStore.tableCell}
		 											ticketsList={monthTicketsStore.ticketsList}
		 				/>;
   }
}

export default withStore(Tickets);
