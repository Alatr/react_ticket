import React from 'react';

import styles from './css/search-input.module.css';


export default function SerchInputView (props){
	
	
	
	return (
			<div className="u-herader-search js-u-search-main-wrapper">
            <svg className="icon--search_2 u-herader-search__icon js-u-header-search__icon" role="presentation">
                <use xlinkHref="#icon-search_2"></use>
            </svg>
						<input className="u-herader-search__input"
									 id={props.id} value={props.value}
									 type="text"
									 placeholder="Поиск страны"
									 title="Введите название страны:"
									 autoComplete="off"
									 onChange={props.handleChange}
							/>
            <ul className="search-project-result js-search-result">
							{props.resultSerch}
						</ul>
          </div>
	);
}

