import { observable, computed, action, runInAction } from 'mobx';

export default class MainStore{
	constructor(rootStore){
		this.rootStore = rootStore;
    this.api = this.rootStore.api;
    this.city = this.rootStore.cityData;
	}
	@observable cityInfo = null;
	@observable IATAData = null;
	@observable ticketsList = [];

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
			},
			parseDate: (val)=>{
				if (val != null) {
					return val.slice(0,10);
				}
			}
		}
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
