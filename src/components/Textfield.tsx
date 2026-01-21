import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

type TextInputProps = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;

    // нове:
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
    onEnter?: () => void;
};

const TextInput: React.FC<TextInputProps> = ({
                                                 label,
                                                 placeholder = "",
                                                 value,
                                                 onChange,
                                                 disabled = false,

                                                 rightIcon,
                                                 onRightIconClick,
                                                 onEnter,
                                             }) => {
    return (
        <Form.Group className="mb-3">
            {label && <Form.Label>{label}</Form.Label>}

            <InputGroup>
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onEnter?.();
                    }}
                />

                {rightIcon && (
                    <Button
                        variant="outline-secondary"
                        onClick={onRightIconClick}
                        disabled={disabled}
                    >
                        {rightIcon}
                    </Button>
                )}
            </InputGroup>
        </Form.Group>
    );
};

export default TextInput;