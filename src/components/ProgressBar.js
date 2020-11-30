import React from "react";

export const ProgressBar = React.memo(({max, value, bgColor, fgColor}) => {
    bgColor = bgColor ?? 'bg-green-100';
    fgColor = fgColor ?? 'bg-green-500';

    const w = value / max * 100;
    return <div className={"h-4 relative w-48 rounded-full overflow-hidden"}>
        <div className={`w-full h-full ${bgColor} absolute`}/>
        <div className={`h-full ${fgColor} absolute transition-all`} style={{width: `${w}%`}}/>
    </div>
});
