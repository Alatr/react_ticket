import TicketsStore from './tickets-store'
import CityData from './city'

import * as tickets from '~/api/tickets';
import * as cityInfo from '~/api/cities';

class RootStore {
	constructor(){
		this.api = {
			tickets,
			cityInfo
		}
		this.tickets = new TicketsStore(this);
		this.cityData = CityData;
	}

}

export default new RootStore();