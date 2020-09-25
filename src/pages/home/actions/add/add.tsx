import React, { useCallback, useEffect } from "react";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import { colorsLight } from "../../../../config/styles/colors";

export const AddTask: React.FC = () => {
    return (
        <div>
            <IconButton>
                <Add style={{ color: colorsLight.primary }} />
            </IconButton>
        </div>
    );
};
