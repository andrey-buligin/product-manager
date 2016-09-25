import "whatwg-fetch";

//we use built in proxy that proxies cals to :8080
const URL = "";

const productsResource = {

	getProducts() {
		return fetch(`${URL}/products`, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(this.checkStatus)
				.then(this.parseJSON)
				.then((json) => {
					return json._embedded.products;
				})
				.catch(function(err) {
					console.warn('Error fetching products', err);
					return [];
				});
	},

	createProduct(product) {
		return fetch(`${URL}/products`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			}).then(this.checkStatus)
				.then(this.parseJSON)
				.then((product) => {
					return product;
				})
				.catch(function(err) {
				console.warn('Error adding new product', err);
			});
	},

	deleteProduct(product) {
		return fetch(`${URL}/products/${product.id}`, {
				method: 'DELETE'
			}).then(this.checkStatus)
				.then((product) => {
					return true;
				})
				.catch(function(err) {
				console.warn(`Error removing product(${product.id})`, err);
			});
	},

	parseJSON(response) {
		return response.json();
	},

	checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(`HTTP Error ${response.statusText}`);
			error.status = response.statusText;
			error.response = response;
			throw error;
		}
	}
}

export default productsResource;
