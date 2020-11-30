import {Detail} from "./Detail";
import {INDEX_TYPES, VERTEX_FORMATS} from "../enums";
import React from "react";

export function MeshImportSettings({changes, setValue}) {
    return <div className={"my-4 flex flex-col"}>
        <Detail
            type={"select"}
            name={"Index type"}
            value={changes['index_type']}
            setValue={(v) => setValue('index_type', v)}
            options={INDEX_TYPES}
            optional={true}/>
        <Detail
            type={"select"}
            name={"Vertex format"}
            value={changes['vertex_format']}
            setValue={(v) => setValue('vertex_format', v)}
            options={VERTEX_FORMATS}
            optional={true}/>
        <Detail
            type={"text"}
            name={"Object Name"}
            value={changes['object_name']}
            setValue={(v) => setValue('object_name', v)}
            optional={true}/>
        <Detail
            type={"number"}
            name={"Geometry Index"}
            value={changes['geometry_index']}
            setValue={(v) => setValue('geometry_index', v)}
            optional={true}/>
        <Detail
            type={"number"}
            name={"Level Of Detail"}
            value={changes['lod']}
            setValue={(v) => setValue('lod', v)}
            optional={true}/>

        <div className={"my-4"}>
            <label className={"block uppercase tracking-wide text-gray-700 dark:text-gray-400 text-xs font-bold mb-2"}>Flags</label>
            <label className={"flex items-center dark:text-gray-200"}>
                <input className={"w-6 h-6 mr-2"}
                       type={"checkbox"}
                       checked={changes['recalculate_normals']}
                       onChange={(ev) => setValue('recalculate_normals', ev.target.checked)}/> Recalculate normals
            </label>
        </div>
    </div>;
}
