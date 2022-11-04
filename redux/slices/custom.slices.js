import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    showTerms: false,
    showPurchase: false,
    purchaseSuccess: false,
    tempTerms: [],
    tempBenefits: [],
    disclosures: {},
    name: '',
    email: ''
}

export const customSlice = createSlice({
    name: 'terms',
    initialState,
    reducers: {
        setShowTerms: (state, action) => {
            state.showTerms = action.payload
        },
        setTempTerms: (state, action) => {
            state.tempTerms = action.payload
        },
        setTempBenefits: (state, action) => {
            state.tempBenefits = action.payload
        },
        setDisclosures: (state, action) => {
            state.disclosures = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setEmail: (state, email) => {
            state.email = action.payload
        },
        setShowPurchase: (state, action) => {
            state.showPurchase = action.payload
        },
        setPurchaseSuccess: (state, action) => {
            state.purchaseSuccess = action.payload
        }

    },
})

export const {
    setShowTerms,
    setTempTerms,
    setTempBenefits,
    setDisclosures,
    setName,
    setShowPurchase,
    setEmail,
    setPurchaseSuccess
} = customSlice.actions;


export default customSlice.reducer