import TicketsStore from './tickets-store'
import MainStore from './main-store'
import MonthTicketsStore from './month-tickets-store'
import CityData from './city'

import * as tickets from '~/api/tickets';
import * as monthTtickets from '~/api/month-tickets';
import * as cityInfo from '~/api/cities';

class RootStore {
	constructor(){
		this.api = {
			tickets,
			monthTtickets,
			cityInfo
		}
		this.tickets = new TicketsStore(this);
		this.monthTickets = new MonthTicketsStore(this);
		this.mainStore = new MainStore(this);
		this.cityData = CityData;
	}

}

export default new RootStore();