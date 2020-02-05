import React from 'react';
import styles from './css/search.module.css';
import rootStore from '~/store';
import withStore from '~/hocs/withStore';
import SearchInputView from '~/components/filter/search-input';



class Search extends React.Component{

	
	render(){
		let res = rootStore.tickets.arrrResultSearch.map((el,i) => <li key={el+i}>{el}</li>);
		console.log(rootStore);

		
       return (
				<div className="search-wrapper">
					<div className="search-item-wrapper">
						<span>Откуда </span>
						<SearchInputView id={12}
								value = {rootStore.tickets.inputSerchFrom.val}
								handleChange = {rootStore.tickets.handlerSearchInput}
								resultSerch={res}
						/>
					</div>
					<div className="search-item-wrapper">
						<span>куда</span>
						<SearchInputView/>
					</div>

				</div>
			 )
   }
}

export default withStore(Search);