import React from "react";
import {Loader} from "./Loader";

export function PrimaryButton({children, loading, icon, disabled, click}) {
    disabled = disabled || loading;
    const disabledClasses = disabled ? 'bg-blue-200 dark:bg-blue-500 dark:opacity-30 text-white cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400 text-white';
    const actualIcon = loading === true ? <Loader/> : icon;
    return <button type="button"
                   disabled={disabled}
                   className={"font-bold py-2 px-4 mx-1 rounded inline-flex items-center " + disabledClasses}
                   onClick={click}>{actualIcon}{children}</button>
}
