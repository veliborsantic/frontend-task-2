import { useState, useEffect } from 'react';

type Props = {
    value: { id: number; name: string }[];
    onChange: (newValue: { id: number; name: string }[]) => void;
    placeholder: string;
    apiUrl: string;
};

const Select = (props: Props) => {
    const [items, setItems] = useState<{ id: number; name: string }[]>([]);

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

    const handleSelectChange = () => {
    };

    return (
        <div>
            <select
                multiple
                value={items.map(item => item.name)}
                onChange={handleSelectChange}
            >
                <option value="" disabled>
                    {props.placeholder}
                </option>
                {items.map(item => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
