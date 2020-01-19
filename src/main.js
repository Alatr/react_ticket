import React from 'react';
import ReactDom from 'react-dom';
import App from '~/containers/app';
import rootStore from '~/store';

rootStore.mainStore.loadCityInfo();
	ReactDom.render(<App/>, document.querySelector('#app'));



