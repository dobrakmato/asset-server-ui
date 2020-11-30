import React from "react";
import {useDispatch} from "react-redux";
import {updateBrowserFilter} from "../redux";

export const Breadcrumbs = React.memo(({path, clickable}) => {
    const dispatch = useDispatch();

    if (!path) {
        return null;
    }

    const tokens = path.split(/[/\\]/);
    const icon = <svg key={'separator-icon'} className={"w-5 h-5 mx-1"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                      fill="currentColor">
        <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"/>
    </svg>;

    return <div className={"text-gray-500 flex items-center"}>
        {tokens.map((it, idx) => {
            if (idx === tokens.length - 1) {
                    return <span key={idx} className={"text-gray-800 dark:text-gray-200"}>{it}</span>
            } else {
                if (clickable) {
                    return <span key={idx} className={"text-gray-500 inline-block cursor-pointer rounded dark:hover:text-gray-400 dark:hover:bg-gray-700 -mx-1 px-1"} onClick={() => dispatch(updateBrowserFilter(it))}>{it}</span>
                } else {
                    return <span key={idx} className={"text-gray-500"}>{it}</span>
                }
            }
        }).reduce((prev, curr) => [prev, icon, curr])}
    </div>;
});
