import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";

import { useStyles } from "./styles";

export const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.navigation} position="static">
                <Toolbar></Toolbar>
            </AppBar>
        </div>
    );
};
