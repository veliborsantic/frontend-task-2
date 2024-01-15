import React, {useState, useEffect, useRef} from 'react';
import './Select.css';

type Props = {
    value: { id: number; name: string }[];
    onChange: (newValue: { id: number; name: string }[]) => void;
    placeholder: string;
    apiUrl: string;
};

const Select = (props: Props) => {
    const [items, setItems] = useState<{ id: number; name: string }[]>([]);
    const [selectedItems, setSelectedItems] = useState<{ id: number; name: string }[]>([]);
    const selectRef = useRef<HTMLSelectElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.apiUrl);
                const data = await response.json();
                setItems(data.items);
                console.log("data items", data.items)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.apiUrl]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIds = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        const newSelectedItems = items.filter(item => selectedIds.includes(item.id));
        const isAnySelected = newSelectedItems.some(newItem => selectedItems.some(item => item.id === newItem.id));
        if (isAnySelected) {
            handleBlur()
            return
        }
        setSelectedItems(prevSelectedItems => [...prevSelectedItems, ...newSelectedItems]);
        props.onChange([...selectedItems, ...newSelectedItems]);
        handleBlur()
    };

    const handleDeleteItem = (id: number) => {
        const updatedSelectedItems = selectedItems.filter(item => item.id !== id);
        setSelectedItems(updatedSelectedItems);
        props.onChange(updatedSelectedItems);
    };

    const handleClearAll = () => {
        setSelectedItems([]);
        props.onChange([]);
    };

    const handleBlur = () => {
        if (selectRef.current) {
            selectRef.current.blur();
        }
    };

    return (
        <div>
            <select
                ref={selectRef}
                multiple
                value={selectedItems.map(item => item.id.toString())}
                onChange={handleSelectChange}
            >
                <option value="" disabled>
                    {props.placeholder}
                </option>
                {items.map(item => (
                    <option key={item.id}
                            value={item.id}
                            className={selectedItems.some(selectedItem => selectedItem.id === item.id) ? 'selected' : 'not-selected'}
                    >
                        {item.name}
                    </option>
                ))}
            </select>
            <div className="selected-items">
                {selectedItems.map(item => (
                    <div key={item.id} className="chip">
                        {item.name}
                        <button onClick={() => handleDeleteItem(item.id)}>&times;</button>
                    </div>
                ))}
                {selectedItems.length > 0 && (
                    <button className="clear-button" onClick={handleClearAll}>
                        Clear All
                    </button>
                )}
            </div>
        </div>
    );
};

export default Select;
