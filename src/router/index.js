import AppTickets from '~/containers/tickets';
import AppMonthTickets from '~/containers/tickets-month';
import AppError404 from '~/components/errors/404';

const routes = [
   {
      name: 'Ticket',
      path: '/',
      component: AppTickets,
      exact: true
   },
   {
      name: 'Month ticket price',
      path: '/month-price',
      component: AppMonthTickets,
      exact: true
   },
   {
      path: '**',
      component: AppError404
   }
];

const routesMap = {};
const routesMapSidebar = [];

routes.forEach((route) => {
   if(route.hasOwnProperty('name')){
      routesMap[route.name] = route.path;
		}
	});
	
	
	for (let key in routesMap) {
		if (key == 'Ticket' || key == 'Month ticket price' || key == 'cart' ) {
			routesMapSidebar.push({
				'name': key,
				'url': routesMap[key]
			});
		}
	}


function urlBuilder(name, params = []){
   if(!routesMap.hasOwnProperty(name)){
      return null;
   }

   let url = routesMap[name];

   for(let key in params){
      url = url.replace(':' + key, params[key]);
   }

   return url;
}

export { routes, routesMap, urlBuilder, routesMapSidebar }