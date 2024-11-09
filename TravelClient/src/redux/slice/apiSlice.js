import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    userReg: [],
    agencyReg: [],
    loginCheck: {},
    error: '',
    loading: false
}

const GET_POST_URL_USER_REGISTER = 'http://localhost:2003/api/auth/user-register'
const GET_POST_URL_AGENCY_REGISTER = 'http://localhost:2003/api/auth/agency-register'
const GET_POST_URL_LOGINCHECK = 'http://localhost:2003/api/auth/login-check'


export const sentPostUser = createAsyncThunk('posts/sendPostUser', async (obj) => {
    console.log('obj====>', obj);
    try {
        const res = await axios.post(GET_POST_URL_USER_REGISTER, obj)
        console.log('USERREG====>', res.data);
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const sendPostAgency = createAsyncThunk('posts/sendPostAgency', async (obj) => {
    // console.log('AgencyRegistrationObj====>', obj);
    console.log('obj====>', obj);
    try {
        const res = await axios.post(GET_POST_URL_AGENCY_REGISTER, obj)
        console.log('AGENCYREG====>', res.data);
        return res.data
    } catch (error) {
        console.error(error);

    }
})

export const sendLoginCheck = createAsyncThunk('posts/sendLoginCheck', async (obj) => {
    console.log(obj);

    try {
        const res = await axios.post(GET_POST_URL_LOGINCHECK, obj)
        console.log('LOGINCHECK====>', res.data);
        return res.data
    } catch (error) {
        console.error(error);
    }
})


export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducer: {},

    extraReducers: (builder) => {

        // USER REGISTER

        builder.addCase(sentPostUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(sentPostUser.fulfilled, (state, action) => {
            state.loading = false
            state.userReg = action.payload
        })

        builder.addCase(sentPostUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        // AGENCY REGISTER

        builder.addCase(sendPostAgency.pending, (state) => {
            state.loading = true
        })

        builder.addCase(sendPostAgency.fulfilled, (state, action) => {
            state.loading = false
            state.agencyReg = action.payload
        })

        builder.addCase(sendPostAgency.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        // LOGIN CHECK

        builder.addCase(sendLoginCheck.pending, (state) => {
            state.loading = true
        })

        builder.addCase(sendLoginCheck.fulfilled, (state, action) => {
            console.log(action);

            state.loading = false
            state.loginCheck = action.payload
        })

        builder.addCase(sendLoginCheck.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default apiSlice.reducer

export const userRegister = (state) => state.apiReducer.post