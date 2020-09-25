import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { colorsLight } from "../../config/styles/colors";

export const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.navigation} position="static">
                <Toolbar>
                    <Typography variant="h5" style={{ fontWeight: "bold", color: colorsLight.primary }}>
                        Minhas Tarefas
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};
