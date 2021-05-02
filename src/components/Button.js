import React, {useState} from "react";
import {Loader} from "./Loader";

export function Button({children, disabled, loading, icon, click, fakeLoad}) {
    const [fakeLoading, setFakeLoading] = useState(false);
    disabled = disabled || loading || fakeLoading;
    const disabledClasses = disabled ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-600 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 hover:bg-gray-400 text-gray-800';
    const actualIcon = (loading || fakeLoading) === true ? <Loader/> : icon;

    const clickProxy = () => {
        if (fakeLoad) {
            setFakeLoading(true);
            window.setTimeout(() => setFakeLoading(false), 500);
        }

        click();
    };

    return <button type="button"
                   disabled={disabled}
                   className={"font-bold outline-none focus:outline-none py-2 px-4 mx-1 rounded inline-flex items-center " + disabledClasses}
                   onClick={clickProxy}>{actualIcon}{children}</button>
}
