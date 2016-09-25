import React, {Component} from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';

import '../app.css';

class About extends Component {
  render() {
    return (
      <div className="about">
        <Jumbotron>
	        <Grid>
	          <h3>Test App for THEOUTNET.COM</h3>
	          <p>
	            App displays list of products and allows to add/remove them.
							App has fluid layout and should adopt for smaller screen sizes.
	          </p>
	          <h4>App is built using folllowing technologies.</h4>
						<ul>
							<li>React, React Router</li>
							<li>Bootstrap components</li>
							<li>Webpack</li>
							<li>ES6, Babel.js</li>
						</ul>
						<small>*<em>create-react-app</em> npm module was used as a base for this project.</small>
						<h4>To run tests please use <code>npm test</code> command</h4>
	        </Grid>
        </Jumbotron>
    	</div>
    );
  }
}

export default About;
