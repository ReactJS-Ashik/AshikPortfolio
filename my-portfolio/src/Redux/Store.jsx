import { configureStore } from '@reduxjs/toolkit'
import reducers from './Slicer'

export const store= configureStore({
    reducer: reducers
});