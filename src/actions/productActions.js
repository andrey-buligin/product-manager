import {Dispatcher} from 'flux';

const instance = new Dispatcher();

export default instance;
export const dispatch = instance.dispatch.bind(instance);

export var Actions = {
	'fetchProducts'() {
		dispatch({type:'products:get'});
	},
  'addProduct'(product) {
		dispatch({type: 'products:add', product});
	},
	'productCreated'(product) {
		dispatch({type: 'products:added', product});
	},
  'removeProduct'(productIndex) {
		dispatch({type: 'products:remove', productIndex});
	}
};
