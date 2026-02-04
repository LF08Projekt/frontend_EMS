import React, {useState} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {AiFillPlusCircle} from 'react-icons/ai';

interface AddQualificationInlineProps {
    onAdd: (qualificationName: string) => Promise<void>;
}

export const AddQualificationInline: React.FC<AddQualificationInlineProps> = ({onAdd}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdd = async () => {
        const name = newName.trim();
        if (!name) return;

        setLoading(true);
        try {
            await onAdd(name);
            setNewName('');
            setIsAdding(false);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdding) {
        return (
            <Button
                variant="outline-secondary"
                onClick={() => setIsAdding(true)}
                className="w-100"
                style={{height: '38px'}}
            >
                + Neue Qualifikation
            </Button>
        );
    }

    return (
        <InputGroup style={{height: '38px'}}>
            <Form.Control
                placeholder="Qualifikation eingeben"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                disabled={loading}
                autoFocus
                style={{height: '38px'}}
            />
            <Button
                variant="success"
                onClick={handleAdd}
                disabled={loading || !newName.trim()}
                style={{height: '38px'}}
            >
                <AiFillPlusCircle/>
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    setIsAdding(false);
                    setNewName('');
                }}
                disabled={loading}
                style={{height: '38px'}}
            >
                ✕
            </Button>
        </InputGroup>
    );
};
