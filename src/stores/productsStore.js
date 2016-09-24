import FluxStore from 'flux/lib/FluxStore';
import ProductDispatcher, {Actions} from '../actions/productActions';

class ProductsStore extends FluxStore {
	constructor() {
		super(...arguments);
		this.products = [{title: 'Random', price: 10}];
		this.__onDispatch = this.onAction.bind(this);
	}

  getAll() {
    return this.products;
  }

	removeListener(callback) {
		this.__emitter._subscriber.removeSubscription(callback)
	}

  onAction(action) {
		const {type, product, productId} = action;
		//debugger;
    switch (type) {
      case 'products:add':
				createProduct(product);
				break;

      case 'products:added':
        addProduct(this.products, product);
				this.__emitChange();
				break;

      case 'products:remove':
				removeProduct(productId);
				this.__emitChange();
				break;

      default:
        return this.products;
    }
  }
}

function createProduct(product) {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			let createdProduct = product;
			Actions.productCreated(createdProduct);
		}, 1500);
	});
}

function addProduct(products, product) {
	products.push(product);
	return products;
}

function removeProduct(products, productIndex) {
	if (products[productIndex]) {
		products.slice(productIndex, 1);
	}
	return products;
};


const instance = new ProductsStore(ProductDispatcher);
export default instance;
