import {configureStore} from '@reduxjs/toolkit'

import PadReducer from './components/PadSlice'
import PadEditorReducer from './components/PadEditorSlice'

export default configureStore({
	reducer: {
		pads: PadReducer,
		'pad-editor': PadEditorReducer
	}
})
