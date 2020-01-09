import { observable, computed, action, runInAction } from 'mobx';

export default class Tickets{
	constructor(rootStore){
		this.rootStore = rootStore;
    this.api = this.rootStore.api;
    this.city = this.rootStore.cityData;
	}
	@observable loading = true;
	@observable filterSetings = {
			currency: {
				type: 'select',
				label: 'Currency',
				getKey: 'currency',
				id: 'currency',
				value: 'uah',
				params: [`uah`,`usd`,`eur`,'rub']
			},
			limit: {
				type: 'select',
				label: 'Limit',
				getKey: 'limit',
				id: 'limit',
				value: '10',
				params: [`10`,`20`,`30`,'40','1000']
			},
			beginning_of_period: {
				type: 'picker',
				label: 'Departure date',
				value: new Date(),
				getKey: "beginning_of_period",
				id: "date-picker-inline",
				format: "yyyy/MM/dd",
				variant: "inline",
			},
		};
	@observable ticketsList = [];
	@observable tablePaginationSattings = {
		selectItems: [3, 5, { label: 'All', value: -1 }],
		numberRows: 3,
		page: -1
	};
	@observable tableCell = [
		{
				key: 'actual',
				label: 'Актуальность',
				id: 'id_actual,',
				format: this.rootStore.mainStore.formatRule.bool
		},
		{
				key: 'gate',
				label: 'Site',
				id: 'id_gate,',
				format: this.rootStore.mainStore.formatRule.string
		},
		{
				key: 'distance',
				label: 'расстояние ',
				id: 'id_distance,',
				format: this.rootStore.mainStore.formatRule.number
		},
		{
				key: 'depart_date',
				label: 'дата отправления',
				id: 'id_depart_date,',
				format: this.rootStore.mainStore.formatRule.string
		},
		{
				key: 'destination',
				label: 'пункт назначения',
				id: 'id_destination,',
				format: this.rootStore.mainStore.formatRule.parseCityCode
		},
		{
				key: 'origin',
				label: 'пункт отправления',
				id: 'id_origin,',
				format: this.rootStore.mainStore.formatRule.parseCityCode
		},
		{
				key: 'return_date',
				label: 'дата возвращения',
				id: 'id_return_date,',
				format: this.rootStore.mainStore.formatRule.string
		},
		{
				key: 'value',
				label: 'Цена',
				id: 'id_value,',
				format: this.rootStore.mainStore.formatRule.number
		},
		{
				key: 'number_of_changes',
				label: 'количество пересадок',
				id: 'id_number_of_changes,',
				format: this.rootStore.mainStore.formatRule.number
		},
		{
				key: 'found_at',
				label: 'когда был найден билет',
				id: 'id_found_at,',
				format: this.rootStore.mainStore.formatRule.string
		},
	];


	@computed get tableCellKey() {
		return this.tableCell.map(el => el.key)
	}
	@computed get ticketsLength() {
		return this.ticketsList.length 
	}
	@action changeLoading(){
		this.loading = false;
	}
	@action changeFilterSetings(val, label ){
		this.filterSetings[label].value = val
	}

	@action changeTicketsListAPI(obj){
		this.ticketsList = [];
		obj.forEach((el)=>{
			let item = {}
			for (const key in el) {
				if (el.hasOwnProperty(key) && this.tableCellKey.includes(key)) {
					item[key] = el[key];
				}
			}
			this.ticketsList.push(item)
		});
		
	}


	@action load = (pa = null)=>{
		return new Promise((resolve)=>{
			this.api.tickets.load(pa).then((data)=>{
				runInAction(() => {
					this.changeTicketsListAPI(data.data);
					this.changeLoading();
					if (pa) {
						this.changeFilterSetings(pa[0],pa[1])
						console.log(data.data,'----------');
						
					}
					resolve();
				});
			});
		});
	}

}
