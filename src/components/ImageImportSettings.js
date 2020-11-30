import {Detail} from "./Detail";
import {IMAGE_FORMAT_OPTIONS} from "../enums";
import React from "react";

export function ImageImportSettings({changes, setValue}) {
    return <>
        <div className={"my-4 flex flex-col"}>
            <Detail
                type={"select"}
                name={"Format"}
                value={changes['format']}
                setValue={(v) => setValue('format', v)}
                options={IMAGE_FORMAT_OPTIONS}
            />
        </div>

        <div className={"my-4"}>
            <label className={"block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"}>Flags</label>
            <label className={"flex items-center dark:text-gray-200"}>
                <input className={"w-6 h-6 mr-2"} type={"checkbox"} checked={changes['v_flip']}
                       onChange={(ev) => setValue('v_flip', ev.target.checked)}/> Vertical flip
            </label>
        </div>
        <div className={"my-4"}>
            <label className={"flex items-center dark:text-gray-200"}>
                <input className={"w-6 h-6 mr-2"} type={"checkbox"} checked={changes['h_flip']}
                       onChange={(ev) => setValue('h_flip', ev.target.checked)}/> Horizontal flip
            </label>
        </div>
        <div className={"my-4"}>
            <label className={"flex items-center dark:text-gray-200"}>
                <input className={"w-6 h-6 mr-2"} type={"checkbox"} checked={changes['pack_normal_map']}
                       onChange={(ev) => setValue('pack_normal_map', ev.target.checked)}/> Pack normal map
            </label>
        </div>
    </>;
}
