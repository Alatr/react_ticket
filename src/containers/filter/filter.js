import React from 'react';
import SelectView from '~/components/filter/select';
import DataPickerView from '~/components/filter/data-picker';
import styles from './css/sidebar.module.css';
import rootStore from '~/store';
import withStore from '~/hocs/withStore';
import SliderView from '~/components/filter/slaider';
import Spinner from '~/components/errors/spinner';
import CheckboxView from '~/components/filter/checkbox';



class Filter extends React.Component{
	componentDidMount(){
		rootStore.tickets.setDefaultTableCell()
	}
	render(){
		let selects = [];
		let checkboxes = rootStore.tickets.tableCell.map((el)=>{
			return <CheckboxView onChange={rootStore.tickets.setRenderTableCell}
													id={el.key}
													label={el.label}
													checked={el.checked}
													key={el.id+'@#$%^&'}
			/>
		});

		
		
		
		
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
										selects.push(
											<SliderView
												key={key}
												label={'Цена'}
												value = {rootStore.tickets.slider.value}
												max={rootStore.tickets.minMax[1]}
												min={rootStore.tickets.minMax[0]}
												onChange={rootStore.tickets.handleChangeValueSlaider} 
												onChangeCommitted={rootStore.tickets.handleCommittedValueSlaider}
												aria-labelledby="range-slider"
											 />
										 )
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
										
                  break;
								}
            
         }
      }
       return (rootStore.tickets.loading) ? 
				<Spinner/> :
				<> 
					<h2>table options</h2>
					{checkboxes}
					<h2>Filter</h2>
          {selects}
        </>;
   }
}

export default withStore(Filter);