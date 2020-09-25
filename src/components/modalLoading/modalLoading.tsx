import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import Lottie from "react-lottie";
import Backdrop from "@material-ui/core/Backdrop";

import { styles } from "./styles";
import { colorsLight } from "../../config/styles/colors";
import animation from "../../assets/animations/login.json";

interface ModalLoadingProps {
    open: boolean;
    isSuccess: boolean;
    onAnimationSuccessFinish?: () => void | boolean;
}

export const ModalLoading: React.FC<ModalLoadingProps> = (modalLoadingProps) => {
    const { open, isSuccess, onAnimationSuccessFinish } = modalLoadingProps;
    const classes = styles();

    return (
        <Backdrop open={open} className={classes.modal}>
            <div>
                {!isSuccess ? (
                    <BeatLoader size={40} loading={open} color={colorsLight.loading.color} />
                ) : (
                    <div>
                        {onAnimationSuccessFinish ? (
                            <Lottie
                                eventListeners={[
                                    {
                                        eventName: "loopComplete",
                                        callback: () => (onAnimationSuccessFinish ? onAnimationSuccessFinish() : null),
                                    },
                                ]}
                                width={150}
                                height={150}
                                options={{
                                    animationData: animation,
                                    autoplay: true,
                                    rendererSettings: {
                                        preserveAspectRatio: "xMidYMid slice",
                                    },
                                }}
                            />
                        ) : null}
                    </div>
                )}
            </div>
        </Backdrop>
    );
};
