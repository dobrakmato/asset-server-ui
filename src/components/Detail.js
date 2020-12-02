import React, {useCallback, useState} from "react";
import {IconClipboard} from "./IconClipboard";

export function Detail({name, value, setValue, type, image, options, min, max, step, optional, copyAllowed = true}) {
    const [enabled, setEnabled] = useState(!optional || !!value);
    const [lastValue, setLastValue] = useState(null);

    const updateValue = useCallback((val) => {
        setLastValue(val);
        (enabled || !optional) ? setValue(val) : setValue(null);
    }, [enabled, optional, setValue]);


    const disableHandler = useCallback((ev) => {
        (ev.target.checked || !optional) ? setValue(lastValue) : setValue(null);
        setEnabled(ev.target.checked);
    }, [optional, setValue, lastValue]);

    const checkbox = <input type={"checkbox"} className={"w-6 h-6 mr-4"} style={{minWidth: '1.5rem'}} checked={enabled}
                            onChange={disableHandler}/>;


    const input = (type, rest) => <div className={"flex items-center"}>
        {optional && checkbox}
        <input
            className={"text-gray-800 dark:text-gray-200 py-3 px-4 bg-gray-100 dark:bg-gray-900 rounded leading-tight flex items-center w-full"}
            disabled={!enabled}
            onChange={(e) => updateValue(e.target.value)}
            type={type}
            value={value === null ? '' : value}
            {...rest}/>
    </div>;

    let content;
    switch (type) {
        case 'custom':
            content = value;
            break;
        case 'text':
            content = input('text');
            break;
        case 'number':
            content = input('number');
            break;
        case 'color':
            content = <div className={"flex items-center"}>
                {optional && checkbox}
                <input
                    className={"text-gray-800 dark:text-gray-200 py-1 px-1 h-10 bg-gray-100 dark:bg-gray-900 rounded leading-tight flex items-center w-full"}
                    disabled={!enabled}
                    onChange={(e) => updateValue(e.target.value)}
                    type={'color'}
                    value={value}/>
            </div>;
            break;
        case 'range':
            const rangeVal = value ? (+value).toFixed(2) : '';
            content = <div className={"flex items-center"}>
                {optional && checkbox}
                <input
                    className={"text-gray-800 dark:text-gray-200 py-1 px-1 h-10 bg-gray-100 dark:bg-gray-900 rounded leading-tight flex items-center w-full"}
                    disabled={!enabled}
                    type={'range'}
                    max={max}
                    min={min}
                    step={step}
                    onChange={(e) => updateValue(parseFloat(e.target.value))}
                    value={value === null ? '' : value}/>
                <span className={"ml-4 dark:text-gray-200"}>{rangeVal}</span>
            </div>;
            break;
        case 'select':
            content = <div className="relative flex items-center">
                {optional && checkbox}
                <select
                    className={"block appearance-none w-full bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-gray-900 py-3 px-4 pr-8 rounded leading-tight"}
                    onChange={(e) => updateValue(e.target.value)}
                    value={value === null ? '' : value}
                    disabled={!enabled}>
                    {options.map(it => <option key={it.value} value={it.value}>{it.title}</option>)}
                </select>
                <div
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20">
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
            break;
        default:
            content = <div className={"text-gray-800 dark:text-gray-200 py-3 px-4 bg-gray-100 dark:bg-gray-900 rounded leading-tight flex items-center"}>
                {image && <div className={"inline mr-2"}>{image}</div>}
                {value}
                {copyAllowed && <IconClipboard copyText={value} />}
            </div>;
    }

    return <div className={"my-2 group w-full"}>
        <label className={"block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-1"}>{name}</label>
        {content}
    </div>
}
