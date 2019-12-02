import React from 'react';
import {routesMapSidebar} from '~/router';
import {NavLink } from 'react-router-dom';
import styles from './css/sidebar.module.css';


export default class Sidebar extends React.Component{
   render(){
      console.log(routesMapSidebar);
      
      let sideBarItems = routesMapSidebar.map((route, i) => {
         return <li key={i} className={`${styles.list_item}`}>
                           <NavLink to={route.url} 
                                          exact={true}
                                          activeClassName={styles.active}
                           >{route.name}</NavLink>
                        </li>
      });
      return <ul className="list-grup">
            {sideBarItems}
      </ul>
   }
}
