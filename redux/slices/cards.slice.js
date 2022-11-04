import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cards: []
}

export const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        setCards: (state, action) => {
            state.cards = [...action.payload]
        }
    },
})

export const { setCards } = cardSlice.actions;


export default cardSlice.reducer