import React from 'react';
import Sidebar from '~/containers/sidebar'
import Select from '~/containers/filter'
import styles from '~/containers/app/css/app.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { routes } from '~/router';
import Logo from './img/my.svg';

export default class App extends React.Component{
   render(){
      
      let routesItems = routes.map((route) => {
         return <Route 
                  key={route.path}
                  path={route.path} 
                  component={route.component}
                  exact={route.exact}
               />
         });
      
      return <BrowserRouter>
         <div className={`container`}>
            <img src={Logo}/>
         </div>
         <hr/>
         <div className="container">
            <aside className="sidebar">
               <Sidebar/>
               <hr/>
               <Select/>
            </aside>
            <main className="content">
            <Switch>
               {routesItems}
            </Switch>
            </main>
         </div>
      </BrowserRouter>
   }
}
