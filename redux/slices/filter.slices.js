import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setCards } from './cards.slice'
import { setDisclosures } from './custom.slices'

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
    insurancePackage: [{
        label: 'Basic',
        value: '1'
    }, {
        label: 'Standard',
        value: '2'
    }, {
        label: 'Ultimate',
        value: '3'
    }],
    paymentType: {
        label: 'One Time',
        value: 'ot'
    },
    minAmount: 10,
    maxAmount: 1000,
    loading: false,
}

export const fetchOffersByFilter = createAsyncThunk('filters/fetchOffers',
    async (_, { getState, dispatch }) => {
        dispatch(setLoading(true))
        const { type, minAmount, maxAmount, insurancePackage } = getState().filter
        const insString = insurancePackage.map(element => element.label).join(',')
        const uri = `/api/hello?id=${type.value}&insurancePackage=${insString}&minAmount=${minAmount}&maxAmount=${maxAmount}`
        const data = await fetch(uri).then(
            res => res.json().then(
                data => data))
        dispatch(setLoading(false))
        dispatch(setCards(data.cards))
        dispatch(setDisclosures(data.disclosureResult))

    })

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
            state.insurancePackage = [...action.payload]
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
        },
        setLoading: (state, action) => {
            state.loading = action.payload
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
    setDates,
    setLoading
} = filterSlice.actions;


export default filterSlice.reducer