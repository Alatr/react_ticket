import { observable, computed, action, runInAction } from 'mobx';

export default class Tickets{
	constructor(rootStore){
		this.rootStore = rootStore;
    this.api = this.rootStore.api.tickets;
	}

	@observable ticketsList = [];


	@action load(){
		return new Promise((resolve)=>{

			this.api.load().then((data)=>{
				runInAction(() => {
					this.ticketsList = data;
					resolve();
				});
			})
		})
	}
}
