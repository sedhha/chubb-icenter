import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    coverage_id: 'BUS001',
    name: 'Liability',
    level: 1,
    maxAmount: 500000,
}

export const customSlice = createSlice({
    name: 'customCoverage',
    initialState,
    reducers: {

    },
})


export default customSlice.reducer