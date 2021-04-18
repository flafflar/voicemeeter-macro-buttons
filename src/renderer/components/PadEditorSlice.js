import {createSlice} from '@reduxjs/toolkit'

export const PadEditorSlice = createSlice({
	name: 'padEditor',
	initialState: {
		/** Whether the editor is open */
		open: false,
		/** The ID of the pad being edited */
		id: null
	},
	reducers: {
		open: (state, action) => {
			state.open = true;
			state.id = action.payload
		},
		close: (state, action) => {
			state.open = false;
		}
	}
})

export const {open, close} = PadEditorSlice.actions

export default PadEditorSlice.reducer
