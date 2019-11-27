import TicketsStore from './tickets-store'

import * as tickets from '~/api/tickets';

class RootStore {
	constructor(){
		this.api = {
			tickets
		}
		this.tickets = new TicketsStore(this);
	}

}

export default new RootStore();