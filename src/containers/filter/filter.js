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
            console.log(element);
            
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
               case 'picker':
                  selects.push(
                     <DataPickerView   label={element.label}
                                       key={key}
                                       defaultValue={element.value}
                                       variant={element.variant}
                                       format={element.format}
                                       getKey={element.getKey}
                                       id={element.id}
                                       onChange={rootStore.tickets.load}
                     
                     />
                  )
                  break;
               default:
                  break;
            }
            
         }
      }
      return <>
         <h2>Filter</h2>
         {selects}
      </>
   }
}

export default withStore(Filter);