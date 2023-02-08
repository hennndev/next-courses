import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: 'appSlice',
    initialState: {
        currentUser: typeof window !== "undefined" && localStorage.getItem("currentUser") ? 
        JSON.parse(localStorage.getItem("currentUser")) : null
    },
    reducers: {
        storeCurrentUser: (state, action) => {
            if(typeof window !== 'undefined') {
                localStorage.setItem('currentUser', JSON.stringify(action.payload))
            }
            state.currentUser = action.payload
        },
        logout: (state) => {
            if(typeof window !== 'undefined') {
                localStorage.removeItem('currentUser')
                state.currentUser = null
            }
        }
    }
})

const reducers = appSlice.reducer
const { storeCurrentUser, logout } = appSlice.actions 

export {
    reducers, 
    storeCurrentUser, logout
}