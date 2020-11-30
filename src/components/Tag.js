import React from "react";

export function Tag({name, ...rest}) {
    return <span className={"bg-green-500 rounded py-1 px-2 mx-1 text-xs font-bold text-white"} {...rest}>
        {name}
    </span>;
}
