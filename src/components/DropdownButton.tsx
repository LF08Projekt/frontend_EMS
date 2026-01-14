import React from "react";
import {Dropdown} from "react-bootstrap";

type DropdownButtonProps = {
    id: string;
    options: string[];
    title?: string;
    onSelect?: (value: string) => void;
};


export const DropdownButton: React.FC<DropdownButtonProps> = ({
                                                                  id,
                                                                  options,
                                                                  onSelect,
                                                                  title,
                                                              }) => {
    return (
        <Dropdown onSelect={(eventKey) => eventKey && onSelect?.(eventKey as string)}>
            <Dropdown.Toggle id={id}>
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map((option) => (
                    <Dropdown.Item key={option} eventKey={option}>
                        {option}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};