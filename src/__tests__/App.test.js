import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import App from '../containers/App';

describe("App", () => {
	var defaultRoute;

	beforeEach(()=> {
		defaultRoute = {component: {name:'About'}};
	});

	it('renders App and displays correct Title', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App routes={['root', defaultRoute]} />, div);
	});

	it('renders Navigation with "About" and "Product manager" links', () => {
		const wrapper = shallow(<App routes={['root', defaultRoute]} />);

		expect(wrapper.find('NavItem').length).toBe(2);
	});

	describe('changes section title depending on current route', () => {
		var wrapper, routes, appRoute;

		beforeEach(() => {
			appRoute = {component: {name: 'ProductsManager'}};
			routes = ['root', appRoute];
			wrapper = shallow(<App routes={routes} />);
		});

		it('sets correct state for "title" after navigating to different page', () => {
			wrapper = mount(<App routes={routes} />);

			expect(wrapper.state('title')).toBe('Product manager');

			appRoute.component.name = "About";
			wrapper.setProps({routes: ['root', appRoute]});
			expect(wrapper.state('title')).toBe('About app');
		});

		it('displays correct title for "ProductsManager"', () => {
			const pageTitle = <h2>Product manager</h2>;

			expect(wrapper.contains(pageTitle)).toBeTruthy();
		});

	});

	it('renders children when passed in', () => {
		const wrapper = shallow(
			<App routes={['root', defaultRoute]}>
				<div className="unique" />
				<span className="another" />
			</App>
		);
		
		expect(wrapper.contains(<div className="unique" />)).toBeTruthy();
		expect(wrapper.contains(<span className="another" />)).toBeTruthy();
	});
});
