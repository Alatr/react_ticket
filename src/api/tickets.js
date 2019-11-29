import makeRequest from './helpers/makeRequest';
const _token = '507a8a2dcf3b32561e43397ce942c367';

export{load};

function load(token = null){
	let url = `/v2/prices/latest?currency=uah&origin=KBP&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&token=${_token}`;
	//let url = `/v2/prices/month-matrix?currency=rub&origin=LED&destination=HKT&show_to_affiliates=true&token=${_token}`;

	return makeRequest(url);
}

