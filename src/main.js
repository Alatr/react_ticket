import React from 'react';
import ReactDom from 'react-dom';
import App from '~/containers/app';
import rootStore from '~/store';
import Spinner from '~/components/errors/spinner';

rootStore.mainStore.loadCityInfo();
	ReactDom.render(<App/>, document.querySelector('#app'));



