import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {changeLabel} from './PadSlice'
import {close} from './PadEditorSlice'

import './pad-editor.css'

class PadEditor extends Component {
	constructor(props){
		super(props);
	}

	close(){
		this.props.dispatch(close())
	}

	onLabelChange(event){
		this.props.dispatch(changeLabel({
			id: this.props.pad.id,
			label: event.target.value
		}))
	}

	render(){
		return (
			<div id='pad-editor' className={this.props.open ? '' : 'hidden'}>
				<div className='input'>
					<label htmlFor='pad-label'>Label:</label>
					<input
						id='pad-label'
						type='text'
						value={this.props.pad.label}
						onChange={this.onLabelChange.bind(this)}
					/>
				</div>
				<div className='input'>
					<label htmlFor='pad-type'>Type:</label>
					<select id='pad-type'>
						<option>Push button</option>
						<option>2 positions</option>
					</select>
				</div>
				<div style={{gridArea: 'bottom-row/last-col', justifySelf: 'end'}}>
					<div className='button' onClick={this.close.bind(this)}>OK</div>
				</div>
			</div>
		);
	}
}

PadEditor.propTypes = {
	/** Whether the editor is open or not */
	open: PropTypes.bool.isRequired,
	/** The pad to edit */
	pad: PropTypes.shape({
		id: PropTypes.number.isRequired,
		pushButton: PropTypes.bool.isRequired,
		label: PropTypes.string.isRequired
	})
}

export default connect((state) => ({
	open: state.padEditor.open,
	pad: state.pads.find(pad => pad.id === state.padEditor.id)
}))(PadEditor)
