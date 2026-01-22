import React, {useState} from "react";
import {InputGroup, FormControl} from "react-bootstrap";
import {FaSearch} from "react-icons/fa";

type SearchBarProps = {
    placeholder?: string;
    onSearch?: (query: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
                                                 placeholder = "Mitarbeiter suchen...",
                                                 onSearch,
                                             }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);

        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <InputGroup className="employee-search-bar">
            <InputGroup.Text>
                <FaSearch/>
            </InputGroup.Text>

            <FormControl
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
            />


        </InputGroup>
    );
};

export default SearchBar;
