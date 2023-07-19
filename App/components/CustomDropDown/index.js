import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

const index = ({ objects, placeholder, onChange }) => {
    //dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(objects);

    useEffect(() => {
        onChange(value)
    }, [value])
    
    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            style={{ width: 120 }}
            dropDownContainerStyle={{ width: 120 }}
        />
    )
}

export default index