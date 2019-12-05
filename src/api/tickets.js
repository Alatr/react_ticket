import makeRequest from './helpers/makeRequest';
const _token = '507a8a2dcf3b32561e43397ce942c367';

export{load};

function load(param = null){
	let url = `/v2/prices/latest?currency=uah&origin=KBP&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&token=${_token}`;
	if (param) {
		let regexp = new RegExp(`${param.key}=([\\w]{1,})&`);
		const regexp3 = /origin=([\w]{1,})&/
		url = url.replace(regexp, param.value);
		console.log(url);
		
		console.log(url.match(regexp));
		console.log(regexp.test(url));
		console.log(regexp);
		console.log(regexp3);
		console.log(param);
	}
	

	return makeRequest(url);
}


function urlBuilder(settings = null){
	
}

