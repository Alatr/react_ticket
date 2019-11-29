import React from 'react';
import ReactDom from 'react-dom';
import App from '~/containers/app';
import rootStore from '~/store';
import Spinner from '~/components/errors/spinner';

rootStore.tickets.loadCityInfo();
ReactDom.render(<Spinner/>, document.querySelector('#app'));
rootStore.tickets.load().then((res)=>{
	ReactDom.render(<App/>, document.querySelector('#app'));
})



