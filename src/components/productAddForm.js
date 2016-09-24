import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import FieldGroup from './fieldGroup';

class ProductAddForm extends Component {

	constructor() {
		super();
		this.state = {
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
			validatePrice: e.target.value.length
		});
	}

	handleTitleChange(e) {
		this.setState({
			title: e.target.value,
			validateTitle: e.target.value.length
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
					placeholder="New shoes"
					help="Please enter valid title!"
					validate={this.validateTitle.bind(this)}
					onChange={this.handleTitleChange.bind(this)}
				/>
				<FieldGroup
					id="price"
					type="text"
					label="Price"
					placeholder="0.0"
					help="Price must be valid!"
					validate={this.validatePrice.bind(this)}
					onChange={this.handlePriceChange.bind(this)}
				/>

				<div className="pull-right">
					<Button type="submit" bsStyle="primary">Add</Button>
				</div>

		  </div>
		);
	}
}

export default ProductAddForm;
