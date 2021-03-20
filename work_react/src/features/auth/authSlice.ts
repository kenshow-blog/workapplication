import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import {
    AUTH_STATE,
    CRED,
    LOGIN_USER,
    POST_PROFILE,
    PROFILE,
    JWT,
    USER,
} from "../types";

export const fetchAsyncLogin = createAsyncThunk(
    'auth/login',
    async (auth: CRED) => {
        const res = await axios.post<JWT>(
            `${process.env.REACT_APP_API_URL}/authen/jwt/create`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncRegister = createAsyncThunk(
    'auth/register',
    async (auth: CRED) => {
        const res = await axios.post<USER>(
            `${process.env.REACT_APP_API_URL}/auth_api/create/`,
            auth,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncGetMyProf = createAsyncThunk(
    'auth/loginuser',
    async () => {
        const res = await axios.get<LOGIN_USER>(
            `${process.env.REACT_APP_API_URL}/auth_api/loginuser/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreateProf = createAsyncThunk(
    'auth/createProfile',
    async () => {
        const res = await axios.post<PROFILE>(
            `${process.env.REACT_APP_API_URL}/auth_api/profile/`,
            { img: null }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncGetMyProfile = createAsyncThunk(
    'auth/getProfile',
    async () => {
        const res = await axios.get<PROFILE[]>(
            `${process.env.REACT_APP_API_URL}/auth_api/profile/`,
             {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            }
        );
        return res.data
    }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
    'auth/updateProfile',
    async (profile: POST_PROFILE) => {
        const uploadData = new FormData();
        profile.img && uploadData.append("img", profile.img, profile.img.name);
        const res = await axios.put<PROFILE>(
            `${process.env.REACT_APP_API_URL}/auth_api/profile/${profile.id}/`,
            uploadData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`
                },
            }
        );
        return res.data
    }
);

const initialState: AUTH_STATE = {
    isLoginView: true,
    openModal: true,
    loginUser: {
        id: 0,
        username: "",
    },
    profile: [{id:0, user_profile: 0, img: null}],
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        toggleMode(state) {
            state.isLoginView = !state.isLoginView;
        },
        setOpenModal(state) {
            state.openModal = true;
        },
        resetOpenModal(state) {
            state.openModal = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncLogin.fulfilled,
            (state, action: PayloadAction<JWT>) => {
                localStorage.setItem("localJWT", action.payload.access);
                action.payload.access && (window.location.href = "/");
            }
        );
        builder.addCase(
            fetchAsyncGetMyProf.fulfilled,
            (state, action: PayloadAction<LOGIN_USER>) => {

                return {
                    
                    ...state,
                    loginUser: action.payload,

                }
            }

        );
        builder.addCase(
            fetchAsyncGetMyProfile.fulfilled,
            (state, action) => {
                return {
                    
                    ...state,
                    profile: action.payload,

                }
            }

        );
       
        builder.addCase(
            fetchAsyncUpdateProf.fulfilled,
            
            (state, action) => {
                return {
                    ...state,
                    profile: [action.payload]
                }
            }
        );
    }
})

export const {
    toggleMode,
    setOpenModal,
    resetOpenModal } = authSlice.actions

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectOpenModal = (state: RootState) => state.auth.openModal;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
export const selectProfile = (state: RootState) => state.auth.profile;

export default authSlice.reducer;