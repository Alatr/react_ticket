import makeRequest from './helpers/makeRequest';
const _token = '507a8a2dcf3b32561e43397ce942c367';

export{load};

function load(param){
	let url = `/v2/prices/latest?currency=uah&origin=KBP&beginning_of_period=2018-12-31&page=1&limit=1000&show_to_affiliates=true&sorting=price&token=${_token}`;
	if (param) {
		const [val, label] = param;
		
		let regexp = new RegExp(`${label}=([\\w-]{1,})&`);
		const match = url.match(regexp)[1];
		url = url.replace(match, val);
	}
	
	return makeRequest(url);
}



