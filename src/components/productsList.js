import React, {Component} from 'react';
import {Table, Button} from 'react-bootstrap';

class ProductsList extends Component {
	render() {
		return (
			<div>
				<Table responsive>
					<thead>
						<tr>
							<th>#ID</th>
							<th>Title</th>
							<th>Price(£)</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
					{this.props.products.map((product, index) => {
						return <tr key={index}>
											<td>{product.id}</td>
											<td>{product.title}</td>
											<td>{product.price}</td>
											<td>
												<Button bsStyle="danger" bsSize="xs"
												onClick={() => this.setState({removed: product.title})}>
												Remove
											</Button></td>
										</tr>
					})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default ProductsList;
