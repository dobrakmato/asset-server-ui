import React, {useEffect, useRef} from "react";
import {IconClear} from "./IconClear";
import {useDispatch, useSelector} from "react-redux";
import {getBrowserFilter, updateBrowserFilter} from "../redux";

export function SearchInput({focusKey, ...rest}) {
    const dispatch = useDispatch();
    const filter = useSelector(getBrowserFilter);
    const ref = useRef();

    useEffect(() => {
        const listener = (e) => {
            if (document.activeElement !== ref.current && e.key === focusKey) {
                if (ref.current) {
                    ref.current.focus();
                    e.preventDefault();
                }
            }
        };
        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    });

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            dispatch(updateBrowserFilter(''));
        }
    }

    return <div className={"flex"}>
        <input ref={ref} value={filter}
               onKeyDown={handleKeyDown}
               className="bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:shadow-outline py-4 px-6 block w-full" {...rest}/>
        {filter && <IconClear onClick={() => dispatch(updateBrowserFilter(''))}/>}
    </div>;
}
