import React from "react";
import {formatDistanceToNow, parseISO} from 'date-fns';
import {durationToSeconds} from "../utility";
import {IconError} from "./IconError";
import {IconTick} from "./IconTick";

export function Compilation({compilation}) {
    const date = parseISO(compilation.timestamp);

    const openErrorDetails = () => {
        if (compilation.error) {
            alert(compilation.error);
        }
    };

    return <tr className="hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-200 group">
        <td className="px-6 py-1 whitespace-no-wrap">
            {formatDistanceToNow(date)} ago
        </td>
        <td className="px-6 py-1 whitespace-no-wrap">
            {durationToSeconds(compilation.duration).toFixed(2)} secs
        </td>
        <td className={"px-6 py-1 whitespace-no-wrap " + (compilation.error ? 'cursor-pointer' : '')}
            onClick={openErrorDetails}>
            {compilation.error ? <IconError/> : <IconTick/>}
        </td>
    </tr>;
}
