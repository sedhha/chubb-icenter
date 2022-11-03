import { configureStore } from '@reduxjs/toolkit'
import custom from "./slices/custom.slices"
export const store = configureStore({
    reducer: { custom },
})