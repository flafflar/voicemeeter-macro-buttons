import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import './pad-editor.css'

class PadEditor extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return <div id='pad-editor'>Pad editor</div>;
	}
}

PadEditor.propTypes = {
	/** Whether the editor is open or not */
	open: PropTypes.bool.isRequired,
	/** The ID of the pad to edit */
	id: PropTypes.number.isRequired
}

export default connect((state) => ({
	open: state.padEditor.open,
	id: state.padEditor.id
}))(PadEditor)
