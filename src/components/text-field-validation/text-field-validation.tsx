import React, { useState, memo } from "react";

import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

interface TextFieldValidationProps {
    value: string;
    setValue: (text: string) => void;
    id: string;
    label: string;
    name: string;
    useMask?: boolean;
    mask?: string;
    autoComplete?: string;
    type?: string;
    security?: string;
    patterns?: Array<string>;
    onValidation?: (valid: boolean) => void;
    helperText?: string;
    compare?: string;
    autoFocus?: boolean;
}

const TextFieldValidation: React.FC<TextFieldValidationProps> = (textFieldValidationProps) => {
    const {
        value,
        setValue,
        id,
        label,
        name,
        useMask = false,
        mask,
        autoComplete,
        type,
        security,
        compare,
        helperText,
        onValidation,
        patterns,
        autoFocus = false,
    } = textFieldValidationProps;

    const [isValid, setIsValid] = useState(true);

    const handlerCompare = (text: string): boolean => {
        if (text === "" && compare === "") return false;
        return text === compare;
    };

    const handlerValidation = (text: string): boolean => {
        if (compare !== undefined) {
            return handlerCompare(text);
        }

        if (patterns && onValidation) {
            const conditions = patterns.map((rule) => new RegExp(rule, "g"));
            return conditions.every((condition) => condition.test(text));
        }
        return true;
    };

    const setOnValidation = (isvalid: boolean): void => {
        if (onValidation) {
            onValidation(isvalid);
        }
    };

    const onChangeText = (text: string): void => {
        setValue(text);
    };

    const handlerOnBlur = (text: string): void => {
        const isValid = handlerValidation(text);
        setOnValidation(isValid);
        setIsValid(isValid);
    };

    if (!useMask) {
        return (
            <TextField
                helperText={!isValid ? helperText : ""}
                error={!isValid}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={id}
                label={label}
                name={name}
                autoFocus={autoFocus}
                onBlur={(onBlur) => handlerOnBlur(onBlur.target.value)}
                onChange={(event) => onChangeText(event.target.value)}
                value={value}
                type={type}
                security={security}
            />
        );
    } else {
        return (
            <InputMask
                mask={mask ? mask : ""}
                value={value}
                onBlur={(onBlur) => handlerOnBlur(onBlur.target.value)}
                onChange={(event) => onChangeText(event.currentTarget.value)}
            >
                <TextField
                    helperText={!isValid ? helperText : ""}
                    error={!isValid}
                    autoComplete={autoComplete}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id={id}
                    label={label}
                    name={name}
                    autoFocus={autoFocus}
                    value={value}
                    type={type}
                    security={security}
                />
            </InputMask>
        );
    }
};

export default memo(TextFieldValidation);
