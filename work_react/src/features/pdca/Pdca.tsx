import React, { useState,useEffect } from 'react';
import styles from "./Pdca.module.css";

import { makeStyles, Theme } from "@material-ui/core/styles";

import {
    Grid,
    List,
    ListItem,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Fab,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    fetchAsyncGetCategory,
    fetchAsyncGetPdc,
    fetchAsyncCreatePdc,
    fetchAsyncCreateAction,
    selectPdc,
    setCreateView,
    resetCreateView,
    selectCreatePdca,
    editPdc,
    editAction,
    selectEditedPdc,
    selectEditedAction,
    selectCategory
} from "./pdcaSlice";

import { AppDispatch } from "../../app/store";

import { initialState } from "./pdcaSlice";

// 考え1:連想配列を利用してuseStateでindexとvalueを保持
// createボタンが押された時にuseStateの中身をforeach文で回して一つずつ何らかの変数に代入(editedActionと同じ形になってる)
// それをeditActionを使ってeditedActionを更新
// 更新したのちそれをmapで展開して一つずつactionの内容を作成していく
const useStyles = makeStyles((theme: Theme) => ({
    table: {
        tableLayout: 'fixed',
    },
    root: {
        width: '100%',
        minWidth: "50vw",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
      },
      rootHome: {
        margin: theme.spacing(2),
        color: "#f3f3f3",
        backgroundColor: "#e33371",
        '&:hover': {
            backgroundColor: "#9a0036",
          }
      },
      addIcon: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    },
      newPdca: {
        margin: theme.spacing(2),
      },
      title: {
        margin: theme.spacing(5, 3),
        minWidth: "40vw"
      },
      pdc: {
          minHeight: "360px",
      },
      aPdc: {
        minHeight: "240px",
      }
      ,
      field: {
        margin: theme.spacing(2),
        width: "100%",
    },
    listItem: {
        padding: "0.5em 1em",
        margin: "2em 0",
        fontWeight: "bold",
        color: "#333333",
        background: "#F3F3F3",
        border: "solid 3px #grey",
        borderRadius: "10px",
        '&:hover': {
            background: "#5651514f",
            opacity: "0.5",
            transition: "0.3s ease-in-out"
          }
        
    },
}))

// アクションはpdcのidをくっつけてpostしてあげる
// pdcのPOSTはtitleをつけてあげる
const Pdca: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const pdc = useSelector(selectPdc);
    const createView = useSelector(selectCreatePdca);
    const editedPdc = useSelector(selectEditedPdc);
    const editedAction = useSelector(selectEditedAction);
    const category = useSelector(selectCategory);
    const [array, setArray] = useState([]);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string = e.target.value;
        const name = e.target.name;
        dispatch(editPdc({ ...editedPdc, [name]: value}));
    }

    const handleInputActionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | number = e.target.value;
        const name = e.target.name;
        setArray({...array, [name]: value})
        console.log(array)
        let test = dispatch(editAction({ ...editedAction, [name]: value}));
        console.log(test.payload)
    }
    const handleSelectCatChange = (
        e: React.ChangeEvent<{ value: unknown }>
        ) => {
            const value = e.target.value as number;
            dispatch(editAction({ ...editedAction, category: value }))
        }
    const create = async () => {
        const result = await dispatch(fetchAsyncCreatePdc(editedPdc));
        if (fetchAsyncCreatePdc.fulfilled.match(result)) {
            await dispatch(fetchAsyncCreateAction({
                    id: 0,
                    action: editedAction.action,
                    pdca: result.payload.id,
                    category_item: editedAction.category_item,
                    action_user: 0,
                    category: editedAction.category,
                    created_at: "",
                    updated_at: "",
                }))
            }
        await dispatch(resetCreateView);
        window.location.reload();
        
    }

    useEffect(() => {
        const fetchBootLoader = async () => {
            
            await dispatch(fetchAsyncGetCategory());
            await dispatch(fetchAsyncGetPdc());
        };
        fetchBootLoader();
    }, [dispatch])
    let datas = []
    let catOptions = category.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
            {cat.item}
        </MenuItem>
    ))


    return (
        <div className={styles.pdca_body}>
        
        {createView? 
        <>
            <Link to="/pdca/" style={{ textDecoration: 'none' }}>
                <Button className={classes.newPdca} variant="contained" color="primary" onClick={() => dispatch(resetCreateView())}>
                    PDCA
                </Button>
            </Link> 
        
            <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={create}
            className={classes.newPdca}
            >
                Create
            </Button>
        <br />

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
        
        <Grid item xs={12} sm={3}>
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
            className={styles.pdca}
        />
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField
            variant="outlined"
            label="Do"
            type="text"
            name="do"
            multiline
            InputProps={{ inputProps: { min: 0, max: 400,className: classes.pdc }}}
            InputLabelProps={{
                shrink: true,
            }}
            value={editedPdc.do}
            onChange={handleInputChange}
            />
        </Grid>
        <Grid item xs={12} sm={3} >
        <TextField
            variant="outlined"
            label="Check"
            type="text"
            name="check"
            multiline
            InputProps={{ inputProps: { min: 0, max: 400,className: classes.pdc }}}
            InputLabelProps={{
                shrink: true,
            }}
            value={editedPdc.check}
            onChange={handleInputChange}
            />
        </Grid>
        <Grid item xs={12} sm={3}>
                <TextField
                variant="outlined"
                label="Action"
                type="text"
                name="action"
                multiline
                InputProps={{ inputProps: { min: 0, max: 400,className: classes.aPdc }}}
                InputLabelProps={{
                    shrink: true,
                }}
                value={editedAction.action}
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
            <Fab
                size="small"
                color="primary"
                // onClick={async () =>{
                //     await dispatch(addAction(initialState.editedAction[0]))
                // }}
                className={classes.addIcon}
                >
                    <AddIcon />
            </Fab>
        </Grid>
        
    </Grid>
        </>
        :
        <>
                
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button className={classes.rootHome} variant="contained" onClick={() => dispatch(resetCreateView())}>
                        HOME
                    </Button>
                </Link>
                <Button className={classes.newPdca} variant="contained" color="primary" onClick={ async () =>{
                    await dispatch(setCreateView())
                    await dispatch(editPdc(initialState.editedPdc))
                    await dispatch(editAction(initialState.editedAction))
                }}>
                    New PDCA
                </Button>

                <List component="nav" className={classes.root} aria-label="mailbox folders">
                    {pdc
                    .slice(0)
                    .reverse()
                    .map((pdc) =>(
                        
                        <ListItem 
                            className={classes.listItem}
                            key={pdc.id}
                            >
                                <Link to={{   
                            pathname: `/pdca/detail/`,
                            state: {id: pdc.id,
                                userPdc: pdc.userPdc,
                                title: pdc.title,
                                plan: pdc.plan,
                                do: pdc.do,
                                check: pdc.check,
                                created_at: pdc.created_at,
                                updated_at: pdc.updated_at,}
                            }}
                            className={styles.ListItem}
                            >
                                <h3 style={{margin: "0", fontSize: "1em"}}>{pdc.created_at}</h3>
                                <h3 style={{margin: "0", fontSize: "1em"}}>{pdc.title}</h3>
                        </Link>
                        </ListItem>
                    ))}
                </List>
        </>
                    }
        
        
        </div>
    )
}

export default Pdca
