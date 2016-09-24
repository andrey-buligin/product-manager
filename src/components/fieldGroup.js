import React from 'react';
import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

function FieldGroup({id, label, validate, help, ...props}) {
	return (
		<FormGroup {...validate() ? {validationState: validate(), controlId: id} : {controlId: id}}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
			<FormControl.Feedback />
		</FormGroup>
	);
}

FieldGroup.propTypes = {
	id: React.PropTypes.string,
	help: React.PropTypes.string,
	label: React.PropTypes.string,
	validate: React.PropTypes.func,
	onChange: React.PropTypes.func
};

export default FieldGroup;
