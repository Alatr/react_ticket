import makeRequest from './helpers/makeRequest';

export{loadCityInfo};

function loadCityInfo(){
	let url = `/data/ru/cities.json`;

	return makeRequest(url);
}

