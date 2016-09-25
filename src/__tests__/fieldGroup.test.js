import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';
import FieldGroup from '../components/fieldGroup';

describe("FieldGroup", () => {
	var validate, onChange;

	beforeEach(() => {
		validate = jest.fn();
		onChange = jest.fn();
	});

	it('renders FieldGroup', () => {
	  const div = document.createElement('div');

	  ReactDOM.render(<FieldGroup
			id="title"
			type="text"
			label="Title"
			value="Existing title"
			placeholder="New title"
			validate={validate}
			onChange={onChange}/>, div);
	});

	it('renders form group component', () => {
		const wrapper = shallow(<FieldGroup
			id="title"
			type="text"
			label="Title"
			help="Please enter valid title"
			validate={validate}
			onChange={onChange}/>);

		expect(wrapper.name()).toBe('FormGroup');
	});

	it('renders form label, input field and feedback field', () => {
		const wrapper = mount(<FieldGroup
			id="title"
			type="text"
			label="Title"
			value="Existing title"
			placeholder="New title"
			validate={validate}
			onChange={onChange}/>);

		expect(wrapper.name()).toBe('FieldGroup');
		expect(wrapper.childAt(0).name()).toBe('ControlLabel');
		expect(wrapper.childAt(1).name()).toBe('FormControl');
		expect(wrapper.childAt(2).name()).toBe('FormControlFeedback');
	});

	it('renders help block under the field if provided', () => {
		const wrapper = mount(<FieldGroup
			id="title"
			type="text"
			label="Title"
			help="Please enter valid title"
			validate={validate}
			onChange={onChange}/>);

		expect(wrapper.childAt(2).name()).toBe('HelpBlock');
		expect(wrapper.childAt(3).name()).toBe('FormControlFeedback');
	});

	it('runs validation callback to add feedback to input field (error, success)', () => {

	});
});
