import React from 'react';
import SelectView from '~/components/filter/select';
import DataPickerView from '~/components/filter/data-picker';
import styles from './css/sidebar.module.css';
import rootStore from '~/store';
import withStore from '~/hocs/withStore';


class Filter extends React.Component{
   render(){
      let selects = [];
      for (const key in rootStore.tickets.filterSetings) {
         if (rootStore.tickets.filterSetings.hasOwnProperty(key)) {
            const element = rootStore.tickets.filterSetings[key];
            selects.push(
               <SelectView label={element.label}
                           key={key}
                           selectItem={element.params}
                           defaultValue={element.value}
                           onChange={rootStore.tickets.load}
               />
            )
            
         }
      }
      return <>
         <h2>Filter</h2>
         {selects}
         <DataPickerView/>
      </>
   }
}

export default withStore(Filter);