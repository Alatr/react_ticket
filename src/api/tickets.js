import makeRequest from './helpers/makeRequest';
const _token = '507a8a2dcf3b32561e43397ce942c367';

export{load};

function load(token = null){
	let url = `prices/latest`;

	//if(token !== null){
		//console.log('44444444444');
		
		url += `?currency=rub&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&token=${_token}`;
	//}
//console.log(url);
	return makeRequest(url);
}

