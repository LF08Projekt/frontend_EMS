import React from "react";
import { Button, Spinner } from "react-bootstrap";

interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
                                                                label,
                                                                onClick,
                                                                type = "button",
                                                                isLoading = false,
                                                                disabled = false,
                                                                className = "",
                                                            }) => {
    return (
        <Button
            type={type}
            variant="secondary"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`px-4 py-2 ${className}`}
        >
            {isLoading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                    />
                    Lädt...
                </>
            ) : (
                label
            )}
        </Button>
    );
};