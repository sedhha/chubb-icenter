import { configureStore } from '@reduxjs/toolkit'
import custom from "./slices/custom.slices"
import filter from "./slices/filter.slices"

export const store = configureStore({
    reducer: { custom, filter },
})