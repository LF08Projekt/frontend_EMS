import React from 'react';

interface TagProps {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

export const Tag: React.FC<TagProps> = ({label, variant = 'primary'}) => {
    return (
        <span className={`qualification-tag ${variant}`}>
            {label}
        </span>
    );
};

export default Tag;