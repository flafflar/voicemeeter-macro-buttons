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
		}
	}
})

export const { open } = PadEditorSlice.actions

export default PadEditorSlice.reducer
