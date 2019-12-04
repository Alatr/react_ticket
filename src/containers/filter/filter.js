import React from 'react';
import SelectView from '~/components/filter/select';
import styles from './css/sidebar.module.css';


export default class Filter extends React.Component{
   render(){
      let currency = [`uah`,`usd`,`eur`,]
      return <>
         <h2>Filter</h2>
         <SelectView label={`currency`}
                     selectItem={currency}
                     onChange={()=>{}}
         />
      </>
   }
}
