import React from 'react';
import ReactDom from 'react-dom';
import App from '~/containers/app';
import * as ticketsAll from '~/api/tickets';

ticketsAll.load().then((res)=>{
	console.log('результат',res);
})


ReactDom.render(<App/>, document.querySelector('#app'));

