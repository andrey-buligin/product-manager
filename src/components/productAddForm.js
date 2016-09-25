import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import FieldGroup from './fieldGroup';
import {Actions} from '../actions/productActions';

class ProductAddForm extends Component {

	constructor() {
		super();
		this.state = this.getInitState();
	}

	getInitState() {
		return {
			priceIsValid: false,
			titleIsValid: false,
			price: 0,
			title: ''
		};
	}

	validateTitle() {
		let title = this.state.title;

		if (!title.length) {
			return false;
		} else if (!title || title.trim().length < 3) {
			return 'error';
		} else {
			return 'success';
		}
	}

	validatePrice() {
		let price = parseInt(this.state.price, 10);

		if (!this.state.price.length) {
			return false;
		} else if (isNaN(price) || price <= 0) {
			return 'error';
		} else {
			return 'success';
		}
	}

	handlePriceChange(e) {
		this.setState({
			price: e.target.value.trim(),
			priceIsValid: this.validatePrice() === 'success'
		});
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value,
			titleIsValid: this.validateTitle() === 'success'
		});
	}

	onProductCreate () {
		Actions.addProduct({
			price: this.state.price,
			title: this.state.title
		});
		this.setState(this.getInitState());
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
