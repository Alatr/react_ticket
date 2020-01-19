import React from 'react';
import SelectView from '~/components/filter/select';
import DataPickerView from '~/components/filter/data-picker';
import styles from './css/sidebar.module.css';
import rootStore from '~/store';
import withStore from '~/hocs/withStore';
import SliderView from '~/components/filter/slaider';
import Spinner from '~/components/errors/spinner';



class Filter extends React.Component{
   
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
                  selects.push(
                    <SliderView
											key={key}
											value={rootStore.tickets.minMax}
											//max={rootStore.tickets.minMaxTickets[key][1]}
											//min={rootStore.tickets.minMaxTickets[key][0]}
											//defaultValue={rootStore.tickets.minMaxTickets[key][0]}
											// onChange={(e,val)=>{
                                 //    console.log(val, rootStore.tickets.minMaxTickets[key]);
                                    
                                 //    rootStore.tickets.minMaxTickets[key] = val}
                                 // } 
											valueLabelDisplay={element.valueLabelDisplay}
											label = {element.label}
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
				<> <h2>Filter</h2>
               {selects}
            </>;
   }
}

export default withStore(Filter);