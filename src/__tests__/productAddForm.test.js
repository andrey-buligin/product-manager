import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import ProductAddForm from '../components/productAddForm';
import {Actions} from '../actions/productActions';

function awaitForAction() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, 500);
	});
}

describe("ProductAddForm", () => {
	it('renders ProductAddForm', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<ProductAddForm />, div);
	});

	it('renders Title and Price fields', () => {
		const wrapper = shallow(<ProductAddForm />);

    expect(wrapper.find('FieldGroup').length).toBe(2);
	});

	describe('should be able to add new product', () => {
		var wrapper, addProductActionStub;

		beforeEach(() => {
			addProductActionStub = sinon.stub(Actions, 'addProduct');
			wrapper = mount(<ProductAddForm />)
		});

		afterEach(() => {
			addProductActionStub.restore();
		});

		it('should have "Add" button that is disabled by default', () => {
			expect(wrapper.state('titleIsValid')).toBeFalsy();
			expect(wrapper.state('priceIsValid')).toBeFalsy();
			expect(wrapper.find('Button').prop('disabled')).toBeTruthy();
		});

		it('should enable "add product" button when user filled Price and Title fields', () => {
			wrapper.setState({
				titleIsValid: true,
			  priceIsValid: true
			});

			expect(wrapper.find('Button').prop('disabled')).toBeFalsy();
		});

		it('should trigger "add product" action on "Add" button click', async () => {
			wrapper.setState({
				price: "0125",
			  title: " Shoes "
			});

			//onClick prop works where simulate click fails
			wrapper.find('Button').prop('onClick')();
			//fixed problem with runner
			await awaitForAction();

			expect(Actions.addProduct.called).toBeTruthy();
			expect(Actions.addProduct.calledWith({
				price: 125,
			  title: "Shoes"
			})).toBeTruthy();
		});

		it('should reset Title and Price fields state on "Add" button click', () => {
			wrapper.setState({
				price: "12",
			  title: "New product",
				priceIsValid: true,
				titleIsValid: true
			});

			wrapper.find('Button').simulate('click');

			let {title, price, priceIsValid, titleIsValid} = wrapper.state();

			expect(title).toBe('');
			expect(price).toBe(0);
			expect(priceIsValid).toBeFalsy();
			expect(titleIsValid).toBeFalsy();
		});

	});

});
