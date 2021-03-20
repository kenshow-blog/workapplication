import React, {useState, useEffect} from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@material-ui/core";
import { ACTIONS } from "../types"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectActions } from "../pdca/pdcaSlice";

const useStyles = makeStyles((theme: Theme) => ({
    table: {
        tableLayout: 'fixed',
    },
    button: {
        paddingLeft: "30px",
        paddingRight: "30px",
    },
    tableRow: {
        marginBottom: "30px"
    },
    gridTable: {
        padding: "0 50px"
    }
}))
const Home: React.FC = () => {
    const classes = useStyles();
    const actions = useSelector(selectActions);
    const columns = actions[0] && Object.keys(actions[0]);
    const [state, setState] = useState<ACTIONS>({
        rows: actions
    })

    useEffect(() => {
        setState((state) => ({
                ...state,
                rows: actions,
            }));
        
    }, [actions]);

    return (
        <>
        <div style={{ width: "100%", marginBottom: "100px"}}>
        </div>
        <Grid item xs={8} className={classes.gridTable}>
            {actions[0]?.id &&
            
                <Table size="small" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {columns
                            .map(
                                (column, colIndex) =>
                                (column === "action" ||
                                column === "category_item") && (
                                    <TableCell align="center" key={colIndex}>
                                       <strong>
                                        {column === "category_item" ? "Category" : "Action"}
                                        </strong>
                                        <br />
                                    </TableCell>

                                )
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.rows
                        .slice(0)
                        .reverse()
                        .filter(function(act) {
                            if (act.category_item === "未選択") {
                            return false; // skip
                            }
                            return true;
                        })
                        .map((row, rowIndex) => (
                           <TableRow key={rowIndex} >
                               {Object.keys(row).map(
                                   (key, colIndex) =>
                                   (
                                       key === "action" ||
                                       key === "category_item"
                                   ) && (
                                       <TableCell
                                       align="center"
                                       key={`${rowIndex}+${colIndex}`}
                                       >
                                           <span>{row[key]}</span>
                                           <br />
                                           <br />
                                           <br />
                                       </TableCell>
                                   )
                                   
                               )} 
                           </TableRow>
                        ))}
                    </TableBody>
                </Table>
                }     
        </Grid>
        <Grid item xs={4}
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "30vh"  }}
         >
        <Link to="/pdca" style={{ textDecoration: 'none' }}>
            <Button color="primary" variant="contained" className={classes.button}>
                PDCA
            </Button>
        </Link>
        </Grid>
        </>
    )
}

export default Home
