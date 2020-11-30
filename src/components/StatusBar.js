import {IconCompile} from "./IconCompile";
import {formatDistance} from "date-fns";
import {useSelector} from "react-redux";
import {getCompilerStatus, getStatus} from "../redux";
import React, {useEffect, useState} from "react";
import {ProgressBar} from "./ProgressBar";

export function StatusBar() {
    const compilerStatus = useSelector(getCompilerStatus);
    const status = useSelector(getStatus);
    const [toCompile, setToCompile] = useState(0);

    useEffect(() => {
        if (compilerStatus.queued > toCompile) {
            setToCompile(compilerStatus.queued);
        }

        if (compilerStatus.queued === 0) {
            setToCompile(0)
        }
    }, [compilerStatus, toCompile]);

    const statusColor = status === 'Connected' ? 'bg-green-500' : 'bg-red-500';

    const etaMs = compilerStatus.eta / Math.max(1, compilerStatus.concurrency) * 1000;
    const eta = compilerStatus.queued > 0 ? formatDistance(0, etaMs, {includeSeconds: true}) : '0';

    return <footer
        className={"bg-white dark:bg-gray-800 w-full flex p-4 border-t border-gray-200 dark:border-gray-600 dark:text-gray-200 fixed bottom-0 flex items-center divide-x dark:divide-gray-600"}>
        <div className={"flex items-center pr-3"}>
            <IconCompile/> {compilerStatus.queued > 0 ? 'Compiling (' + compilerStatus.concurrency + ' workers)' : 'Idle'}
        </div>
        <div className={"flex items-center px-3"}>
            <span className={"mr-2"}>Queued: </span>
            <span className={"font-bold text-gray-500 dark:text-gray-400"}>{compilerStatus.queued}</span>
        </div>
        <div className={"flex items-center px-3"}>
            <span className={"mr-2"}>ETA: </span>
            <span className={"font-bold text-gray-500 dark:text-gray-400"}>{eta}</span>
        </div>
        <div className={"flex items-center px-3 py-1"}>
            <ProgressBar max={toCompile} value={toCompile - compilerStatus.queued}/>
        </div>
        <div className={"ml-auto flex items-center pl-3"}>
            <span className={"w-4 h-4 rounded-full mr-2 " + statusColor}/>
            <span className={"text-gray-500 dark:text-gray-400"}>{status}</span>
        </div>
    </footer>
}
