import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import FieldGroup from './fieldGroup';
import {Actions} from '../actions/productActions';

class ProductAddForm extends Component {

	constructor() {
		super();
		this.state = {
			priceIsValid: false,
			titleIsValid: false,
			validatePrice: false,
			validateTitle: false,
			price: 0,
			title: ''
		};
	}

	validateTitle() {
		const title = this.state.title;

		if (!this.state.validateTitle) {
			return false;
		} else if (!title || title.trim().length < 3) {
			return 'error';
		} else {
			return 'success';
		}
	}

	validatePrice() {
		const price = this.state.price;

		if (!this.state.validatePrice) {
			return false;
		} else if (isNaN(price) || price <= 0) {
			return 'error';
		} else {
			return 'success';
		}
	}

	handlePriceChange(e) {
		this.setState({
			price: parseInt(e.target.value, 10),
			validatePrice: e.target.value.length,
			priceIsValid: this.validatePrice() === 'success'
		});
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value,
			validateTitle: e.target.value.length,
			titleIsValid: this.validateTitle() === 'success'
		});
	}

	onProductCreate () {
		let newProduct = {
			price: this.state.price,
			title: this.state.title
		};
		Actions.addProduct(newProduct);

		this.setState({
			price: '',
			title: '',
			validatePrice: false,
			validateTitle: false
		});
	}

	render() {
		return (
			<div className="product-add-form">
				<p>Use form below to create new product</p>

				<FieldGroup
					id="title"
					type="text"
					label="Title"
					value={this.state.title}
					placeholder="New shoes"
					help="Please enter valid title. Title should be at least 3 chars long"
					validate={this.validateTitle.bind(this)}
					onChange={this.handleTitleChange.bind(this)}
				/>
				<FieldGroup
					id="price"
					type="text"
					label="Price"
					value={this.state.price}
					placeholder="0.0"
					help="Please enter valid price in £."
					validate={this.validatePrice.bind(this)}
					onChange={this.handlePriceChange.bind(this)}
				/>

				<div className="pull-right">
					<Button type="submit" bsStyle="primary"
						disabled={!this.state.titleIsValid || !this.state.priceIsValid}
						onClick={(e) => this.onProductCreate()}>Add</Button>
				</div>

		  </div>
		);
	}
}

export default ProductAddForm;
