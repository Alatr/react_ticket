import React from 'react';
import Tickets from '~/containers/tickets'
import Sidebar from '~/containers/sidebar'
import styles from '~/containers/app/css/app.css';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import { routes } from '~/router';

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
         <div className="container">
            <aside className="sidebar">
               <Sidebar/>
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
