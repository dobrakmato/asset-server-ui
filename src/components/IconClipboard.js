import React, {useState} from "react";
import {copyToClipboard} from "../utility";

export function IconClipboard({copyText, ...props}) {
    const [tooltip, setTooltip] = useState(false);
    const copy = async () => {
        if (copyText) {
            await copyToClipboard(copyText);
            setTooltip(true);
            setTimeout(() => setTooltip(false), 500);
        }
    };
    return <div className={"ml-auto relative"}>
        <svg className={"w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 cursor-pointer"}
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             onClick={copy} {...props}>
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"/>
            <path
                d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"/>
        </svg>
        {tooltip && <div className={"bg-gray-600 text-gray-200 text-xs rounded px-1 absolute top-0"} style={{zIndex: 99999, left: '1.5rem'}}>Copied!</div>}
    </div>;
}
