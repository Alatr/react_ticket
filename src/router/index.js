import AppProducts from '~/components/products/list';
import AppProduct from '~/components/products/item';
import AppCart from '~/containers/cart';
import AppOrder from '~/containers/order';
import AppResult from '~/containers/result';
import AppError404 from '~/components/errors/404';

const routes = [
   {
      name: 'home',
      path: '/',
      component: AppProducts,
      exact: true
   },
   {
      name: 'product',
      path: '/product/:id',
      component: AppProduct,
      exact: true
   },
   {
      name: 'cart',
      path: '/cart',
      component: AppCart,
      exact: true
   },
   {
      name: 'order',
      path: '/order',
      component: AppOrder,
      exact: true
   },
   {
      name: 'result',
      path: '/result',
      component: AppResult,
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
		if (key == 'home' || key == 'order' || key == 'cart' ) {
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