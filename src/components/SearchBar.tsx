import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
 
type EmployeeSearchBarProps = {
  placeholder?: string;
  onSearch?: (query: string) => void;
};
 
const EmployeeSearchBar: React.FC<EmployeeSearchBarProps> = ({
  placeholder = 'Mitarbeiter suchen...',
  onSearch,
}) => {
  const [query, setQuery] = useState('');
 
  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };
 
  return (
<InputGroup className="employee-search-bar">
<InputGroup.Text>
<FaSearch />
</InputGroup.Text>
<FormControl
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
<Button variant="secondary" onClick={handleSearch}>
        Suchen
</Button>
</InputGroup>
  );
};
 
export default EmployeeSearchBar;

