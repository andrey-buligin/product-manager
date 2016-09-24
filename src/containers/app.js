import React, {Component} from 'react';
import {Link} from 'react-router';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

import reactLogo from '../assets/logo.svg';
import brandLogo from '../assets/outnet-logo.png';
import '../app.css';

const ROUTE_TITLES = {
  "About": "About app",
  "ProductsManager": "Product manager"
};

class App extends Component {
	constructor (props) {
		super();
		console.log(props);
		this.state = {
			title: ROUTE_TITLES[props.routes[1].component.name]
		};
	}

	componentWillReceiveProps(newProps) {
		console.log('new props', newProps.routes[1].component.name);
		this.setState({title: ROUTE_TITLES[newProps.routes[1].component.name]});
	}

  render() {
    return (
      <div className="app">
        <header className="header">
					<Navbar staticTop fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">
									<img src={brandLogo} alt="The Outnet" className="brand-logo" />
								</Link>
              </Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav activeKey>
								<IndexLinkContainer to="/">
									<NavItem eventKey={1}>Product manager</NavItem>
								</IndexLinkContainer>
								<LinkContainer to="/about">
							    <NavItem eventKey={2}>About</NavItem>
							  </LinkContainer>
							</Nav>
            </Navbar.Collapse>
	        </Navbar>
          <h2>{this.state.title}</h2>
        </header>
				<main>
					{this.props.children}
				</main>
				<footer className="footer">
					<span>Powered by <img src={reactLogo} alt="Powered by react" className="react-logo"/></span>
				</footer>
    	</div>
    );
  }
}

export default App;
