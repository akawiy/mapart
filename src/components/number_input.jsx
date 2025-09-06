import {useState, useEffect} from "react";


export default function NumberInput({value, setValue, minValue, maxValue, defaultValue, insertDefaultValue=true}) {

    const [inputValue, setInputValue] = useState(insertDefaultValue ? value : "");


    useEffect(() => {
        if (!inputValue) return;

        setInputValue(value);
    }, [value]);


    useEffect(() => {
        if (value < minValue) {
            setValue(minValue);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    }, [minValue, maxValue]);


    const onChange = event => {
        const n = event.target.value;
        
        if (!n) {
            setValue(defaultValue);
            setInputValue("");
        } else if (/^\d+$/.test(n) && Math.round(+n) == +n && minValue <= +n && +n <= maxValue) {
            setValue(+n);
            setInputValue(`${+n}`);
        }
    }


    return (
        <input type="text" value={inputValue} placeholder={defaultValue} onChange={onChange} />
    );

}
