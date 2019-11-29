import { observable, computed, action, runInAction } from 'mobx';

export default class Tickets{
	constructor(rootStore){
		this.rootStore = rootStore;
    this.api = this.rootStore.api;
    this.city = this.rootStore.cityData;
	}
	@observable cityInfo = null;
	@observable IATAData = null;
	@observable ticketsList = [];
	@observable tableCell = [
		{
				key: 'actual',
				label: 'Актуальность',
				id: 'id_actual,',
				format: this.formatRule.bool
		},
		{
				key: 'depart_date',
				label: 'дата отправления',
				id: 'id_depart_date,',
				format: this.formatRule.string
		},
		{
				key: 'destination',
				label: 'пункт назначения',
				id: 'id_destination,',
				format: this.formatRule.parseCityCode
		},
		{
				key: 'origin',
				label: 'пункт отправления',
				id: 'id_origin,',
				format: this.formatRule.parseCityCode
		},
		{
				key: 'return_date',
				label: 'дата возвращения',
				id: 'id_return_date,',
				format: this.formatRule.string
		},
		{
				key: 'value',
				label: 'Цена',
				id: 'id_value,',
				format: this.formatRule.number
		},
		{
				key: 'number_of_changes',
				label: 'количество пересадок',
				id: 'id_number_of_changes,',
				format: this.formatRule.number
		},
		{
				key: 'found_at',
				label: 'когда был найден билет',
				id: 'id_found_at,',
				format: this.formatRule.string
		},
	];

	get formatRule() {
		return {
			bool: (value) => {
				if (value != null) {
					return value ? 'Да' : 'Нет'
				}
			},
			string: (value) => {
				if (value != null) {
					return value.toLocaleString();
				}
			},
			number: (value, num = 2) => {
				if (value != null) {
					return value.toFixed(num);
				}
			},
			parseCityCode: (val)=>{
				return (this.IATAData) ? this.IATAData[val] : val;
				
			}
		}
	}

	@computed get tableCellKey() {
		return this.tableCell.map(el => el.key)
	}
	@action parseIATAData() {		
		let newObjCityInfo = {};
			if (this.cityInfo) {
				this.cityInfo.forEach((el) => {
					newObjCityInfo[el.code] = el.name
				});
			}
		this.IATAData = newObjCityInfo;
	}

	@action changeTicketsListAPI(obj){
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


	@action load(){
		return new Promise((resolve)=>{
			this.api.tickets.load().then((data)=>{
				runInAction(() => {
					console.log(data.data);
					
					this.changeTicketsListAPI(data.data);
					resolve();
				});
			});
		});
	}
	@action loadCityInfo(){
		return new Promise((resolve)=>{
			this.api.cityInfo.loadCityInfo().then((data)=>{
				runInAction(() => {
					this.cityInfo = data;
					this.parseIATAData();
					resolve();
				});
			});
		});
	}
}
