import React, { useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { PDC } from "../types";
import * as H from "history";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { DeleteDialog } from "./DeleteDialog";
import styles from "./Pdca.module.css";


import {
    fetchAsyncGetActions,
    fetchAsyncGetCategory,
    selectPdca,
    selectActions,
    selectCategory,
    selectSelectedPdc,
    setEditView,
    resetEditView,
    fetchAsyncUpdatePdc,
    selectEditPdc,
    selectEditedPdc,
    editPdc,
    editAction,
    selectEditedAction,
    fetchAsyncUpdateAction,
    fetchAsyncDeletePdca
} from "./pdcaSlice";

import {
    Grid,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from "@material-ui/core";

interface Props extends RouteComponentProps<{}> {
    location: H.Location<PDC>
}
const useStyles = makeStyles((theme: Theme) => ({
    rootHome: {
        margin: theme.spacing(2),
        color: "#f3f3f3",
        backgroundColor: "#e33371",
        '&:hover': {
            backgroundColor: "#9a0036",
          }
      },
      pdc: {
        minHeight: "360px",
    },
    aPdc: {
      minHeight: "240px",
    },

    editPdca: {
        margin: theme.spacing(2),
      },
    field: {
        margin: theme.spacing(2),
        width: "100%",
    },
    title: {
        margin: theme.spacing(5, 3),
        minWidth: "40vw"
      },
    pdcaSelect: {
        minHeight: "240px",
        border: "solid 1px #C0C0C0",
        borderRadius: "10px",
        textAlign:"left",
        padding: "10px",
        margin: "10px"
    },
    pdcaSelectA: {
        minHeight: "120px",
        border: "solid 1px #C0C0C0",
        borderRadius: "10px",
        textAlign:"left",
        padding: "10px",
        margin: "10px"
    },
    category: {
        minHeight: "30px",
        border: "solid 1px #C0C0C0",
        borderRadius: "10px",
        padding: "10px",
        margin: "10px"
    },
    pdcaTitle: {
        fontSize: "2em",
        border: "solid 1px #C0C0C0",
        maxWidth: "70%",
        margin: "0 auto",
        marginTop: "30px"
    }
}))

const PdcaDetail: React.FC<Props> = (props) => {
    const classes = useStyles();
    let pdc_props = props.location.state;
    const dispatch: AppDispatch = useDispatch();
    const pdc =  useSelector(selectSelectedPdc);
    const actions = useSelector(selectActions);
    const category = useSelector(selectCategory);
    const editView = useSelector(selectEditPdc);
    const editedPdc = useSelector(selectEditedPdc);
    const editedAction = useSelector(selectEditedAction);
    const [commDlg, setCommDlg] = React.useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = e.target.value;
        const name = e.target.name;
        dispatch(editPdc({ ...editedPdc, [name]: value}));
    }

    const handleInputActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value;
        const name = e.target.name;
        dispatch(editAction({ ...editedAction, [name]: value}));
    }
 
    const handleSelectCatChange = (
        e: React.ChangeEvent<{ value: unknown }>
        ) => {
            const value = e.target.value as number;
            dispatch(editAction({ ...editedAction, category: value }))
        }


    const update = async () => {
        await dispatch(fetchAsyncUpdateAction(editedAction));
        await dispatch(selectPdca(editedPdc));
        await dispatch(fetchAsyncUpdatePdc(editedPdc));
    }

    useEffect(() => {
        const fetchBootLoader = async () => {
            await dispatch(selectPdca(pdc_props));
            await dispatch(fetchAsyncGetActions());
            await dispatch(fetchAsyncGetCategory());
        };
        
        fetchBootLoader();
    }, [dispatch]);
    const actionContent = actions.filter((act) => {
        return act.pdca === pdc_props.id
    })

    let catOptions = category.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
            {cat.item}
        </MenuItem>
    ))
    return (
        <div className={styles.pdca_body}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button className={classes.rootHome} variant="contained" onClick={() => dispatch(resetEditView())}>
                        Home
                    </Button>
                </Link>
                <Link to="/pdca/" style={{ textDecoration: 'none' }}>
                    <Button className={classes.editPdca} variant="contained" color="primary" onClick={() => dispatch(resetEditView())}>
                        PDCA
                    </Button>
                </Link>
                {editView? <>
                <Button
                className={classes.editPdca} 
                        variant="contained"
                        color="secondary"
                        size="medium"
                        onClick={update}
                        >
                            Update
                </Button>
                <br />
                </> :
                <>
                <Button variant="contained" className={classes.editPdca} color="secondary" onClick={ async () =>{
                    await dispatch(editPdc(pdc));
                    if(actionContent[0].action !== 'undefined') {
                        await dispatch(editAction(actionContent[0]));
                    }
                    await dispatch(setEditView())
                }}>
                    Edit
                </Button>

                <Button className={classes.editPdca} color="inherit" variant="contained" style={{marginLeft:"10px"}}
                onClick={ 
                    () => {
                     setCommDlg(true)
                        }} >
                 DEL
             </Button>
             </>
                    }
            <DeleteDialog
                    msg={"Are you sure you want to permanently delete this files ?"}
                    isOpen={commDlg}
                    doYes={async () => {
                        await dispatch(fetchAsyncDeletePdca(pdc.id))
                        await setCommDlg(false)
                        window.location.href = "/pdca/";

                    }}
                    doNo={() => {setCommDlg(false)}}

                />
            {editView? 
            <>
            <TextField
            variant="outlined"
            label="Title"
            type="text"
            name="title"
            InputProps={{ inputProps: { min: 0, max: 400 }}}
            InputLabelProps={{
                shrink: true,
            }}
            value={editedPdc.title}
            onChange={handleInputChange}
            className={classes.title}
            />
            <Grid container>
                
                <Grid item xs={3}>
                    <TextField
                    label="Plan"
                    type="text"
                    name="plan"
                    variant="outlined"
                    multiline
                    InputProps={{ inputProps: { min: 0, max: 400,className: classes.pdc }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={editedPdc.plan}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={3}>
                <TextField
                    label="Do"
                    type="text"
                    name="do"
                    variant="outlined"
                    multiline
                    InputProps={{ inputProps: { min: 0, max: 400,className: classes.pdc }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={editedPdc.do}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={3}>
                <TextField
                    label="Check"
                    type="text"
                    name="check"
                    variant="outlined"
                    multiline
                    InputProps={{ inputProps: { min: 0, max: 400,className: classes.pdc }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={editedPdc.check}
                    onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    label="Action"
                    type="text"
                    name="action"
                    variant="outlined"
                    multiline
                    InputProps={{ inputProps: { min: 0, max: 400,className: classes.aPdc }}}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={editedAction?.action ?
                        editedAction.action : ""}
                    onChange={handleInputActionChange}
                    />
                <FormControl className={classes.field}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        onChange={handleSelectCatChange}
                        value={editedAction.category}
                    >
                        {catOptions}
                    </Select>

                </FormControl>
                </Grid>
            </Grid> </>:
            <>
            <h1 className={classes.pdcaTitle}>{pdc.title}</h1>
            <Grid container>
                <Grid item xs={3}>
                    <h2>P</h2>
                    <p className={classes.pdcaSelect}>
                    {pdc.plan}
                    </p>
                </Grid>
                <Grid item xs={3}>
                <h2>D</h2>
                <p className={classes.pdcaSelect}>
                {pdc.do}
                </p>
                </Grid>
                <Grid item xs={3}>
                <h2>C</h2>
                <p className={classes.pdcaSelect}>
                {pdc.check}
                </p>
                </Grid>
                <Grid item xs={3}>
                <h2>A</h2>
                
                {actionContent[0]?.action ?
                <>
                <p className={classes.pdcaSelectA}>
                {actionContent[0].action}
                </p>
                <strong>Category</strong>
                <br/>
                <p className={classes.category}>
                {actionContent[0].category_item}
                </p>
                
                </>
                : <></>
                }
                </Grid>

            </Grid>
            </>
            }
        </div>
    )
}

export default PdcaDetail
