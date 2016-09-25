import FluxStore from 'flux/lib/FluxStore';
import ProductDispatcher, {Actions, ActionNames} from '../actions/productActions';
import ProductsAPI from '../resources/products';

const _products = [];

class ProductsStore extends FluxStore {
	constructor() {
		super(...arguments);
		this.__onDispatch = this.onAction.bind(this);
		Actions.fetchProducts();
	}

  getAll() {
    return _products;
  }

	removeListener(callback) {
		this.__emitter._subscriber.removeSubscription(callback)
	}

	addSyncListener(callback) {
		return this.__emitter.addListener('sync', callback)
	}

	__emitSync() {
		this.__emitter.emit('sync');
	}

  onAction(action) {
		const {type, product, products, removeId} = action;

    switch (type) {
      case ActionNames.GET_PRODUCTS:
				this.__emitSync();
				ProductsAPI.getProducts().then((fetchedProducts) => {
					Actions.resetProducts(fetchedProducts);
				});
				break;

      case ActionNames.RESET_PRODUCTS:
				resetProducts(products);
				this.__emitChange();
				break;

      case ActionNames.ADD_PRODUCT:
				this.__emitSync();
				ProductsAPI.createProduct(product).then((createdProduct) => {
					Actions.productCreated(createdProduct);
				});
				break;

      case ActionNames.PRODUCT_ADDED:
				if (product && product.id) {
        	addProduct(product);
					this.__emitChange();
				}
				break;

      case ActionNames.REMOVE_PRODUCT:
				this.__emitSync();
				ProductsAPI.deleteProduct(product).then(() => {
					Actions.productRemoved(product.id);
				});
				break;

      case ActionNames.PRODUCT_REMOVED:
				removeProduct(removeId);
				this.__emitChange();
				break;

      default:
        return _products;
    }
  }
}

function resetProducts(products) {
	_products.splice(0, _products.length, ...products);
	return _products;
}

function addProduct(product) {
	_products.push(product);
	return _products;
}

function removeProduct(productId) {
	let deleteIndex = null;

	_products.forEach((product, index) => {
		if (productId === product.id) {
			deleteIndex = index;
		}
	});

	if (deleteIndex !== null) {
		_products.splice(deleteIndex, 1);
	}

	return _products;
};


const instance = new ProductsStore(ProductDispatcher);
export default instance;
