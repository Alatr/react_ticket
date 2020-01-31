import {
	observable,
	computed,
	action,
	runInAction,
	toJS
} from 'mobx';

export default class Tickets{
	constructor(rootStore){
		this.rootStore = rootStore;
    this.api = this.rootStore.api;
    this.city = this.rootStore.cityData;
    this.mainStore = this.rootStore.mainStore;
	}

	// loading page and preloader
	@observable loading = true;

	@action changeLoading() {
		this.loading = false;
	}


	



	@observable ticketsList = [];


	@computed get ticketsLength() {
		return this.ticketsList.length
	}

	@action setTicketsList = (val) => {
		this.ticketsList = val
	}

// filter tickets 


	@observable filterSetings = {
		currency: {
			type: 'select',
			label: 'Currency',
			getKey: 'currency',
			id: 'currency',
			value: 'uah',
			params: [`uah`, `usd`, `eur`, 'rub']
		},
		beginning_of_period: {
			type: 'picker',
			label: 'дата отправления',
			value: new Date(),
			getKey: "depart_date",
			id: "date-picker-inline-depart",
			format: "yyyy/MM/dd",
			variant: "inline",
		},
		return_of_period: {
			type: 'picker',
			label: 'дата возвращения',
			value: new Date(),
			getKey: "return_date",
			id: "date-picker-inline-return",
			format: "yyyy/MM/dd",
			variant: "inline",
		},
		slider: {
			type: 'slider',

		},
	};

	@observable renderTableCell = [];
	@action setRenderTableCell = (val)=>{
		const index = this.tableCell.findIndex(el => el.key === val.target.value);
		
		let _tempArr = this.renderTableCell.map((el) => el);
		
		_tempArr.push(this.tableCell[index]);
		this.renderTableCell = _tempArr
		
	}
	@observable tableCell = [
		{
				key: 'actual',
				label: 'Актуальность',
				id: 'id_actual,',
				format: this.rootStore.mainStore.formatRule.bool
		},
		{
				key: 'gate',
				label: 'Сайт',
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
				format: this.rootStore.mainStore.formatRule.parseDate
		},
	];

	@computed get tableCellKey() {
		return this.tableCell.map(el => el.key)
	}

// value: 557.25
// trip_class: 0
// show_to_affiliates: true
// return_date: "2020-03-18"
// origin: "IEV"
// number_of_changes: 0
// gate: "Ryanair"
// found_at: "2020-01-30T18:48:54.852176"
// duration: 220
// distance: 836
// destination: "KTW"
// depart_date: "2020-03-11"
// actual: true
	
	
	@action filterData = (e, pikerName) => {
		this.ticketsList = this.ticketsList.filter((el) => {
			let a = Date.parse(el[pikerName]);
			let b = Date.parse(e);
			return a == b;
		});
		for (const key in this.filterSetings) {
				const element = this.filterSetings[key];
				if(element.getKey == pikerName) element.value = e;
		}
	}
	@action changeFilterSetings(val, label) {
		this.filterSetings[label].value = val
	}


	// slider prise filter

	@observable slider = {
		value : (()=>{
				let priceArr = this.ticketsList.map((el, i) => this.ticketsList[i]['value']);
				return [Math.min(...priceArr),Math.max(...priceArr)];			
		})()
	}
	@computed get minMax() {
		let priceArr = this.rootStore.mainStore.ticketsList.map((el, i) => this.rootStore.mainStore.ticketsList[i]['value']);
		return [Math.floor(Math.min(...priceArr)),Math.floor(Math.max(...priceArr))];
	}
	@action handleChangeValueSlaider = (e,val)=>{
		this.slider.value = val
	}
	@action handleCommittedValueSlaider = (e, val) => {
		this.ticketsList = this.rootStore.mainStore.ticketsList.filter((el, i) => el.value >= val[0] && el.value <= val[1]);
	}

	


	
	

	// @action changeTicketsListAPI(obj){
	// 	this.rootStore.mainStore.ticketsList = [];
	// 	this.ticketsList = [];
	// 	obj.forEach((el)=>{
	// 		let item = {}
	// 		for (const key in el) {
	// 			if (el.hasOwnProperty(key) && this.renderTableCell.includes(key)) {
	// 				item[key] = el[key];
	// 			}
	// 		}
	// 		this.rootStore.mainStore.ticketsList.push(item)
	// 		//this.ticketsList.push(item)
	// 	});
	// 	this.setTicketsList(this.rootStore.mainStore.ticketsList)
	// }


	@action load = (pa = null)=>{
		
		return new Promise((resolve)=>{
			this.api.tickets.load(pa).then((data)=>{
				runInAction(() => {
					console.log(this.tableCellKey);
					this.rootStore.mainStore.ticketsList = data.data
					this.setTicketsList(this.rootStore.mainStore.ticketsList)
					//this.changeTicketsListAPI(data.data);
					this.changeLoading();

					if (pa) {
						this.changeFilterSetings(pa[0],pa[1]);
						
					}
					resolve();
				});
			});
		});
	}


















	// pagination

		@observable tablePaginationSattings = {
			selectItems: [15, 20, 25, 30, {
				label: 'All',
				value: -1
			}],
			numberRows: 15,
			page: 0
		};


		@action handleChangeRowsPerPage = (e) => {
			this.tablePaginationSattings.numberRows = parseInt(e.target.value, 10);
		}
		@action handleNextButtonClick = () => {
			this.tablePaginationSattings.page = this.tablePaginationSattings.page + 1;
		}
		@action handleBackButtonClick = () => {
			this.tablePaginationSattings.page = this.tablePaginationSattings.page - 1;
		}
		@action handleFirstPageButtonClick = () => {
			this.tablePaginationSattings.page = 0;
		}
		@action handleLastPageButtonClick = () => {
			this.tablePaginationSattings.page = Math.ceil(this.ticketsLength / this.tablePaginationSattings.numberRows) - 1;
		}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
