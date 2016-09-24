import React, {Component} from 'react';
import {Grid, Row, Col, Collapse, Button} from 'react-bootstrap';
import Products from '../stores/productsStore';
import NewProductForm from './productAddForm';

class ProductsManager extends Component {

	constructor() {
		super();
		this.state = {
			open: false
		};
		this.onProductsUpdate = this.onProductsUpdate.bind(this);
	}

	componentWillMount() {
		this.setState({products: Products.getAll()});
    Products.addListener(this.onProductsUpdate);
  }

	componentWillUnmount() {
		Products.removeListener(this.onProductsUpdate);
	}

	onProductsUpdate() {
		debugger;
		this.setState({products: Products.getAll()});
	}

	render() {
		return (
			<div className="product-manager">
				<Grid>
					<Row className="show-grid">
						<Col md={5} mdOffset={3} sm={6} smOffset={3} xs={10} xsOffset={1}>
							<Button
								className="add-new-product"
								bsStyle="success"
								onClick={() => this.setState({open: !this.state.open})}>
								Add new product
							</Button>
							<Collapse in={this.state.open}>
								<div>
									<NewProductForm/>
								</div>
							</Collapse>
						</Col>
					</Row>
					<Row className="show-grid">
						<Col sm={6} md={3}>
							<h5>Existing products</h5>
							{this.state.products.map((product, index) => {
								return <div key={index}>{product.title}: £{product.price}</div>
							})}
						</Col>
					</Row>
				</Grid>
		  </div>
		);
	}
}

export default ProductsManager;
