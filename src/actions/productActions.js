import {Dispatcher} from 'flux';

const instance = new Dispatcher();
export default instance;

export const dispatch = instance.dispatch.bind(instance);

export const ActionNames = {
	GET_PRODUCTS: 'products:get',
	RESET_PRODUCTS: 'products:reset',
	ADD_PRODUCT: 'products:add',
	PRODUCT_ADDED: 'products:added',
	REMOVE_PRODUCT: 'products:remove',
	PRODUCT_REMOVED: 'products:removed'
};

export var Actions = {
	fetchProducts() {
		dispatch({type: ActionNames.GET_PRODUCTS});
	},
	resetProducts(productsArr) {
		dispatch({type: ActionNames.RESET_PRODUCTS, products: productsArr});
	},
  addProduct(product) {
		dispatch({type: ActionNames.ADD_PRODUCT, product});
	},
	productCreated(product) {
		dispatch({type: ActionNames.PRODUCT_ADDED, product});
	},
  removeProduct(product) {
		dispatch({type: ActionNames.REMOVE_PRODUCT, product});
	},
  productRemoved(removeId) {
		dispatch({type: ActionNames.PRODUCT_REMOVED, removeId});
	}
};
