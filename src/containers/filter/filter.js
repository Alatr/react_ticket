import React from 'react';
import SelectView from '~/components/filter/select';
import DataPickerView from '~/components/filter/data-picker';
import styles from './css/sidebar.module.css';
import rootStore from '~/store';
import withStore from '~/hocs/withStore';
import SliderView from '~/components/filter/slaider';
import Spinner from '~/components/errors/spinner';



class Filter extends React.Component{
	componentDidUpdate(prevProps) {
		function isEq(array1, array2) {
			var temp = (array1.length == array2.length) && array1.every(function (element, index) {
				return element === array2[index];
			});
			return temp
		}

		console.log(isEq([1, 1], [1, 1]), rootStore.tickets.minMax, prevProps.stores.tickets.minMax);

		// Популярный пример (не забудьте сравнить пропсы):
		if (rootStore.tickets.minMax == prevProps.stores.tickets.minMax) {
			//this.fetchData(this.props.userID);
		}
	}
	render(){
		let selects = [];
      for (const key in rootStore.tickets.filterSetings) {
				if (rootStore.tickets.filterSetings.hasOwnProperty(key)) {
            const element = rootStore.tickets.filterSetings[key];
            
            switch (element.type) {
               case 'select':
                  selects.push(
                     <SelectView label={element.label}
                                 key={key}
                                 id={element.id}
                                 getKey={element.getKey}
                                 selectItem={element.params}
                                 defaultValue={element.value}
                                 onChange={rootStore.tickets.load}
                     />
										 )
               break;
               case 'slider':
								 break;
								 case 'picker':
									 selects.push(
                     <DataPickerView   label={element.label}
										 key={key}
                                       defaultValue={element.value}
                                       variant={element.variant}
                                       format={element.format}
                                       getKey={element.getKey}
                                       id={element.id}
                                       onChange={rootStore.tickets.filterData}
                     
																			 />
                  )
                  break;
									default:
										console.log('--------', rootStore.tickets.minMax.slice());
										
										
										selects.push(
											 <SliderView
											 		key={'!@#$%^&*()'}
													type={'slider'}
													valueLabelDisplay={'on'}
													label={'Цена'}
												 	onChangeCommitted={() => console.log('jngrcn')}
													 value={rootStore.tickets.slider.value}
													// value={rootStore.tickets.minMax.slice()}
													 max={rootStore.tickets.minMaxTickets[key][1]}
												 min={rootStore.tickets.minMaxTickets[key][0]}
												 //defaultValue={rootStore.tickets.minMaxTickets[key][0]}
												 onChange={rootStore.tickets.handleChangeValueSlaider} 
												 aria-labelledby="range-slider"
											 />
										 )
                  break;
								}
            
         }
      }
       return (rootStore.tickets.loading) ? 
				<Spinner/> :
				<> <h2>Filter</h2>
               {selects}
            </>;
   }
}

export default withStore(Filter);