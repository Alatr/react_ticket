let mainServerUrl = '/v2/';

export default function makeRequest(url, options = {}, baseUrl = mainServerUrl){
	console.log(baseUrl + url,'<-----');
	
	return fetch(baseUrl + url, options).then((response) => {
		if(response.status !== 200){
			return response.text().then(function(text){
				throw new Error(text);
			});
		}
		console.log(response, '<-----');
		
		return response.json();
	});
}