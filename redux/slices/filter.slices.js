import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: {
        label: 'Accident',
        value: 'acc',
    },
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    calendarOpen: false,
    location: {
        label: 'Singapore',
        value: 'sg',
    },
    insurancePackage: {
        label: 'Basic',
        value: '1'
    },
    paymentType: {
        label: 'One Time',
        value: 'ot'
    },
    minAmount: 10,
    maxAmount: 100,
    loading: false,
}

export const filterSlice = createSlice({
    name: 'filterSlice',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = { ...action.payload }
        },
        setLocation: (state, action) => {
            state.location = { ...action.payload }
        },
        setInsurancePackage: (state, action) => {
            state.insurancePackage = { ...action.payload }
        },
        setPaymentType: (state, action) => {
            state.paymentType = { ...action.payload }
        },
        setFromPrice: (state, action) => {
            state.minAmount = action.payload
        },
        setToPrice: (state, action) => {
            state.maxAmount = action.payload
        },
        toggleOpen: (state) => {
            state.calendarOpen = !state.calendarOpen
        },
        setDates: (state, action) => {
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
        }
    },
})

export const {
    setType,
    setLocation,
    setInsurancePackage,
    setPaymentType,
    setFromPrice,
    setToPrice,
    toggleOpen,
    setDates
} = filterSlice.actions;


export default filterSlice.reducer