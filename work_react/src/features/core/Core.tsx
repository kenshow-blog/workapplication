import React ,{ useEffect } from 'react';
import { Auth } from "../auth/Auth";
import { Grid, Avatar } from "@material-ui/core";
import Home from  "../home/Home";
import Pdca from  "../pdca/Pdca";
import PdcaDetail from  "../pdca/PdcaDetail";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
    Theme
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WorkIcon from '@material-ui/icons/Work';
import styles from "./Core.module.css";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {
    fetchAsyncGetMyProf,
    resetOpenModal,
    fetchAsyncGetMyProfile,
    setOpenModal,
    selectProfile,
    selectOpenModal,
    selectLoginUser,
    fetchAsyncUpdateProf
} from "../auth/authSlice";
import {
    fetchAsyncGetActions,
    fetchAsyncGetCategory,
} from "../pdca/pdcaSlice";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#3cb371",
        }
    }
});
const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginTop: theme.spacing(3),
    },
    avatar: {
        marginLeft: theme.spacing(1),
        minWidth: "80px",
        minHeight: "80px",
    },
}));

const Core: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const modal = useSelector(selectOpenModal);
    const loginUser = useSelector(selectLoginUser);


    
    const Logout = () => {
        localStorage.removeItem("localJWT");
        window.location.href = "/";
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput?.click();
    }

    useEffect(() => {
        const fetchBootLoader = async () => {
            if(localStorage.localJWT) {
                dispatch(resetOpenModal());
                
                const result = await dispatch(fetchAsyncGetMyProf());

                if (fetchAsyncGetMyProf.rejected.match(result)) {
                    dispatch(setOpenModal());
                    localStorage.removeItem("localJWT");
                    return null;
                }
                await dispatch(fetchAsyncGetMyProfile());
                await dispatch(fetchAsyncGetActions());
                await dispatch(fetchAsyncGetCategory());
            }
        };
        fetchBootLoader();
    }, [dispatch]);
    return (
        <MuiThemeProvider theme={theme}>
            {modal ? <Auth />:

            <>
            <div className={styles.app__root}>
                <Grid container>
                    <Grid item xs={4}>
                    <a href="/" style={{textDecoration: "none", color: "inherit"}}>
                        <WorkIcon fontSize="large" className={classes.icon} />
                    </a>
                    </Grid>
                
                <Grid item xs={4}>
                    <a href="/" style={{textDecoration: "none", color: "inherit"}}><h1>WORK APP</h1></a>
                </Grid>
                <Grid item xs={4}>
                    <div className={styles.app__logout}>
                        <button className={styles.app__iconLogout} onClick={Logout}>
                            <ExitToAppIcon fontSize="large" />
                        </button>
                    <input
                    type="file"
                    id="imageInput"
                    hidden={true}
                    onChange={(e) => {
                        console.log(profile[0])
                        dispatch(
                            fetchAsyncUpdateProf({
                                id: profile[0].id,
                                img: e.target.files !== null ? e.target.files[0] : null,
                            })
                        )
                    }}
                    />
                    <div>
                    <button className={styles.app__btn} onClick={handleEditPicture}>
                        <Avatar
                        className={classes.avatar}
                        alt="avatar"
                        src={
                            profile[0]?.img !== null ? profile[0]?.img : undefined
                        }
                        />
                    </button>
                    <br/>
                    <span>{loginUser.username}</span>
                    </div>
                    </div>
                </Grid>


                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/pdca" component={Pdca} />
                        <Route path="/pdca/detail/" component={PdcaDetail} />

                     </Switch>
                    </BrowserRouter>
                </Grid>
            </div>
            </>}
            
        </MuiThemeProvider>
    );
}

export default Core