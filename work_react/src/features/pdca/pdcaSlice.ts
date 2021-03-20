import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { ACTION, PDCA_STATE, CATEGORY, PDC } from "../types";
import { statement } from "@babel/template";
import { PlaylistAddOutlined } from "@material-ui/icons";

export const fetchAsyncGetActions = createAsyncThunk(
    "get/actions", async () => {
        const res = await axios.get<ACTION[]>(
            `${process.env.REACT_APP_API_URL}/pdca/action/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);
export const fetchAsyncGetCategory = createAsyncThunk(
    "get/category", async () => {
        const res = await axios.get<CATEGORY[]>(
            `${process.env.REACT_APP_API_URL}/pdca/category/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncGetPdc = createAsyncThunk(
    "get/pdc", async () => {
        const res = await axios.get<PDC[]>(
            `${process.env.REACT_APP_API_URL}/pdca/pdc/`,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncCreatePdc = createAsyncThunk(
    "post/pdc", async (pdc: PDC) => {
        const res = await axios.post<PDC>(
            `${process.env.REACT_APP_API_URL}/pdca/pdc/`,
            pdc,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);
export const fetchAsyncCreateAction = createAsyncThunk(
    "post/action", async (action: ACTION) => {
        const res = await axios.post<ACTION>(
            `${process.env.REACT_APP_API_URL}/pdca/action/`,
            action,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );

        return res.data;
    }
);


export const fetchAsyncUpdatePdc = createAsyncThunk(
    "update/pdc", async (pdc: PDC) => {
        const res = await axios.put<PDC>(
            `${process.env.REACT_APP_API_URL}/pdca/pdc/${pdc.id}/`,
            pdc,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);
export const fetchAsyncUpdateAction = createAsyncThunk(
    "update/action", async (action: ACTION) => {
        const res = await axios.put<ACTION>(
            `${process.env.REACT_APP_API_URL}/pdca/action/${action.id}/`,
            action,
            {
                headers: {
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

export const fetchAsyncDeletePdca = createAsyncThunk(
    "delete/pdca",
    async (id: number) => {
        const res = await axios.delete(
            `${process.env.REACT_APP_API_URL}/pdca/pdc/${id}/`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
    return id;
    }
)

export const initialState: PDCA_STATE = {
    actions: [
        {
        id: 0,
        action: "",
        pdca: 0,
        category_item: "",
        action_user: 0,
        category: 0,
        created_at: "",
        updated_at: "",
        },
    ],
    category:[
        {
        id: 0,
        item: ""
        },
    ],
    pdc: [
        {
        id: 0,
        userPdc: 0,
        title: "",
        plan: "",
        do: "",
        check: "",
        created_at: "",
        updated_at: "",
        },
    ],
    selectedPdc: {
        id: 0,
        userPdc: 0,
        title: "",
        plan: "",
        do: "",
        check: "",
        created_at: "",
        updated_at: "",
        },
    editedPdc: {
        id: 0,
        userPdc: 0,
        title: "",
        plan: "",
        do: "",
        check: "",
        created_at: "",
        updated_at: "",
    },
    editedAction: 
        {
        id: 0,
        action: "",
        pdca: 0,
        category_item: "未選択",
        action_user: 0,
        category: 5,
        created_at: "",
        updated_at: "",
        },
        
    editView: false,
    createView: false,

}

export const pdcaSlice = createSlice({
    name: "pdca",
    initialState,
    reducers: {
        selectPdca(state, action: PayloadAction<PDC>) {
            state.selectedPdc = action.payload
        },
        editPdc(state, action: PayloadAction<PDC>) {
            state.editedPdc = action.payload
        },
        editAction(state, action: PayloadAction<ACTION>) {
            state.editedAction = action.payload
        },
        setEditView(state) {
            state.editView = true;
        },
        resetEditView(state) {
            state.editView = false;
        },
        setCreateView(state) {
            state.createView = true;
        },
        resetCreateView(state) {
            state.createView = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchAsyncGetActions.fulfilled,
            (state, action: PayloadAction<ACTION[]>) => {
                return {
                    ...state,
                    actions: action.payload,
                }
            }
        );
        builder.addCase(fetchAsyncGetActions.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncGetCategory.fulfilled,
            (state, action : PayloadAction<CATEGORY[]>) => {
                return {
                    ...state,
                    category: action.payload,
                }
            }
        );
        builder.addCase(
            fetchAsyncGetPdc.fulfilled,
            (state, action : PayloadAction<PDC[]>) => {
                return {
                    ...state,
                    pdc: action.payload,
                }
            }
        );
        builder.addCase(fetchAsyncGetPdc.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncUpdatePdc.fulfilled,
            (state, action : PayloadAction<PDC>) => {
                return {
                    ...state,
                    pdc: state.pdc.map((t) => 
                    t.id === action.payload.id ? action.payload : t)
                    ,
                    editedPdc: initialState.editedPdc,
                    editView: initialState.editView
                }
                
            }
        );
        builder.addCase(fetchAsyncUpdatePdc.rejected, () => {
            window.location.href = "/";
        });
        builder.addCase(
            fetchAsyncUpdateAction.fulfilled,
            (state, action : PayloadAction<ACTION>) => {
                return {
                    ...state,
                    actions: state.actions.map((t) => 
                    t.id === action.payload.id ? action.payload : t)
                    ,
                    editedAction: initialState.editedAction
                }
                
            }
        );
        builder.addCase(fetchAsyncUpdateAction.rejected, () => {
            window.location.href = "/";
        });

        builder.addCase(
            fetchAsyncCreatePdc.fulfilled,
            
            (state, action: PayloadAction<PDC>) => {
                return {
                    ...state,
                    pdc: [action.payload, ...state.pdc],
                    editedAction: {...state.editedAction, pdca: action.payload.id},
                    editedPdc: initialState.editedPdc
                }
            }
            )
            builder.addCase(fetchAsyncCreatePdc.rejected, () => {
                window.location.href = "/";
            });
            builder.addCase(
                fetchAsyncCreateAction.fulfilled,
                (state, action: PayloadAction<ACTION>) => {
                    return {
                        ...state,
                        actions: [action.payload, ...state.actions],
                        editedAction: initialState.editedAction,
                        
                    }
                }
                )
                builder.addCase(fetchAsyncCreateAction.rejected, () => {
                    window.location.href = "/";
                });
            
                builder.addCase(
                    fetchAsyncDeletePdca.fulfilled,
                    (state, action: PayloadAction<number>) => {
                        return {
                            ...state,
                            pdc: state.pdc.filter((t) => t.id !== action.payload),
                            editedAction: initialState.editedAction,
                            editedPdc: initialState.editedPdc,
                            selectedPdc: initialState.selectedPdc
                        }
                    }
                );
                builder.addCase(fetchAsyncDeletePdca.rejected, () => {
                    window.location.href = "/";
                });

    }
});

export const { selectPdca, setEditView, resetEditView, editPdc, editAction, setCreateView, resetCreateView } = pdcaSlice.actions;
export const selectActions = (state: RootState) => state.pdca.actions;
export const selectCategory = (state: RootState) => state.pdca.category;
export const selectPdc = (state: RootState) => state.pdca.pdc;
export const selectSelectedPdc = (state: RootState) => state.pdca.selectedPdc;
export const selectEditPdc = (state: RootState) => state.pdca.editView;
export const selectCreatePdca = (state: RootState) => state.pdca.createView;
export const selectEditedPdc = (state: RootState) => state.pdca.editedPdc;
export const selectEditedAction = (state: RootState) => state.pdca.editedAction;

export default pdcaSlice.reducer;