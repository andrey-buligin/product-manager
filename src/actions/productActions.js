import {Dispatcher} from 'flux';

const instance = new Dispatcher();
export default instance;

export const dispatch = instance.dispatch.bind(instance);

export const ActionNames = {
	GET_PRODUCTS: 'products:get',
	ADD_PRODUCT: 'products:add',
	PRODUCT_ADDED: 'products:added',
	REMOVE_PRODUCT: 'products:remove'
};

export var Actions = {
	fetchProducts() {
		dispatch({type: ActionNames.GET_PRODUCTS});
	},
  addProduct(product) {
		dispatch({type: ActionNames.ADD_PRODUCT, product});
	},
	productCreated(product) {
		dispatch({type: ActionNames.PRODUCT_ADDED, product});
	},
  removeProduct(productIndex) {
		dispatch({type: ActionNames.REMOVE_PRODUCT, productIndex});
	}
};
