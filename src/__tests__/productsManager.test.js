import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import sinon from 'sinon';
import ProductsManager from '../components/productsManager';
import ProductsStore from '../stores/productsStore';

describe("ProductsManager", () => {
	it('renders ProductsManager', () => {
	  const div = document.createElement('div');

	  ReactDOM.render(<ProductsManager/>, div);
	});

	describe("ProductsManager mounted", () => {
		var sandbox, wrapper;

		beforeEach(() => {
			sandbox = sinon.sandbox.create();
			sandbox.stub(ProductsStore, 'addListener');
			sandbox.stub(ProductsStore, 'addSyncListener');
			sandbox.stub(ProductsStore, 'removeListener');

			wrapper = mount(<ProductsManager />);
		});

		afterEach(() => {
			sandbox.restore();
		});

		it('contains products list', () => {
			expect(wrapper.find('ProductsList').length).toBe(1);
		});

		it('has new product form hidden', () => {
			expect(wrapper.find('Collapse').length).toBe(1);
			expect(wrapper.find('NewProductForm').length).toBe(0);
			expect(wrapper.state('open')).toBe(false);
		});

		it('displays "new product form" on button click', () => {
			wrapper.setState({open: true});
			//expect(wrapper.find('NewProductForm').length).toBe(1);
			expect(wrapper.find('Collapse').prop('in')).toBe(true);
		});

		it('displays sync indicator when Products store starts sync process', () => {

		});

		it('updates state() when Product Store changes', () => {

		});

	});

});
