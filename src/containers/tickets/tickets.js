import React from 'react';
import withStore from '~/hocs/withStore';

class Tickets extends React.Component{
   render(){
      let ticketsStore = this.props.stores.tickets;
      console.log(ticketsStore.ticketsList);
      
      return <h1>hi, bro this is Tickets component</h1>
   }
}

export default withStore(Tickets);
