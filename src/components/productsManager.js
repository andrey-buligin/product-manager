import React, {Component} from 'react';
import {Grid, Row, Col, Collapse, Button} from 'react-bootstrap';
import Products from '../stores/productsStore';
import NewProductForm from './productAddForm';
import ProductsList from './productsList';

class ProductsManager extends Component {

	constructor() {
		super();
		this.state = {
			open: false,
			isSyncing: false
		};
		this.onProductsUpdate = this.onProductsUpdate.bind(this);
		this.onProductsSyncStart = this.onProductsSyncStart.bind(this);
	}

	componentWillMount() {
		this.setState({products: Products.getAll()});
    this.productsUpdateListener = Products.addListener(this.onProductsUpdate);
    this.syncStartListener = Products.addSyncListener(this.onProductsSyncStart);
  }

	componentWillUnmount() {
		Products.removeListener(this.productsUpdateListener);
		Products.removeListener(this.syncStartListener);
	}

	onProductsUpdate() {
		this.setState({
			isSyncing: false,
			products: Products.getAll()
		});
	}

	onProductsSyncStart() {
		this.setState({isSyncing: true});
	}

	render() {
		return (
			<div className="product-manager" style={{opacity: this.state.isSyncing ? 0.5 : 1}}>
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
								<NewProductForm/>
							</Collapse>
						</Col>
					</Row>
					<Row className="show-grid">
						<Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
							<h4>Existing products</h4>
							<ProductsList products={this.state.products} {...this.props}/>
						</Col>
					</Row>
				</Grid>
		  </div>
		);
	}
}

export default ProductsManager;
