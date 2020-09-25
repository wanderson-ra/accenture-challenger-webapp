import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { colorsLight } from "../../config/styles/colors";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navigation: {
            backgroundColor: colorsLight.page.background,
            justifyContent: "center",
            alignItems: "center",
        },
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        button: {
            color: colorsLight.dark,
            fontSize: theme.spacing(2),
            fontWeight: "bold",
            marginLeft: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
    })
);
