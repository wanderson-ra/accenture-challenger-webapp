import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { colorsLight } from "../../config/styles/colors";

interface ResponsiveDialogProps {
    title: string;
    message: string;
    open: boolean;
    okButtonTitle: string;
    cancelButtonTitle?: string;
    okButtonHandler: () => void;
    cancelButtonHandler?: () => void;
    onClose: () => void;
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = (responsiveDialogProps) => {
    const {
        onClose,
        okButtonHandler,
        cancelButtonHandler,
        title,
        message,
        open,
        okButtonTitle,
        cancelButtonTitle,
    } = responsiveDialogProps;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog fullScreen={fullScreen} open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={okButtonHandler}
                    style={{
                        color: colorsLight.dark,
                    }}
                >
                    {okButtonTitle}
                </Button>
                {cancelButtonTitle ? (
                    <Button
                        onClick={cancelButtonHandler}
                        style={{
                            color: colorsLight.dark,
                        }}
                        autoFocus
                    >
                        {cancelButtonTitle}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
};
