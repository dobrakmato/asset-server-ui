import {Detail} from "./Detail";
import {BLEND_MODES} from "../enums";
import React from "react";
import {IconReference} from "./IconReference";

export function MaterialImportSettings({changes, setValue}) {
    return <div className={"my-4 flex flex-col"}>
        <Detail type={"select"}
                name={"Blend Mode"}
                value={changes['blend_mode']}
                setValue={(v) => setValue('blend_mode', v)}
                options={BLEND_MODES}/>
        <Detail
            type={"color"}
            name={"Albedo Color"}
            value={changes['albedo_color']}
            setValue={(v) => setValue('albedo_color', v)}
            optional={true}/>
        <Detail
            type={"range"}
            name={"Alpha cutoff"}
            value={changes['alpha_cutoff']}
            setValue={(v) => setValue('alpha_cutoff', v)}
            min={0}
            max={1}
            step={0.01}
            optional={true}/>
        <Detail
            type={"range"}
            name={"Roughness"}
            value={changes['roughness']}
            setValue={(v) => setValue('roughness', v)}
            min={0}
            max={1}
            step={0.01}
            optional={true}/>
        <Detail
            type={"range"}
            name={"Metallic"}
            value={changes['metallic']}
            setValue={(v) => setValue('metallic', v)}
            min={0}
            max={1}
            step={0.01}
            optional={true}/>
        {changes['blend_mode'] === 'Translucent' && <Detail
            type={"range"}
            name={"Opacity"}
            value={changes['opacity']}
            setValue={(v) => setValue('opacity', v)}
            min={0.01}
            max={1}
            step={0.01}
            optional={true}/>}
        {changes['blend_mode'] === 'Translucent' && <Detail
            type={"range"}
            name={"IOR"}
            value={changes['ior']}
            setValue={(v) => setValue('ior', v)}
            min={0.01}
            max={3}
            step={0.01}
            optional={true}/>}

        <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200 flex items-center"}>
            <IconReference/> Referenced Assets</h3>

        <Detail
            name={"Albedo Map"}
            value={changes['albedo_map']}
            optional={true}/>

        <Detail
            name={"Normal Map"}
            value={changes['normal_map']}
            optional={true}/>

        <Detail
            name={"Displacement Map"}
            value={changes['displacement_map']}
            optional={true}/>

        <Detail
            name={"Roughness Map"}
            value={changes['roughness_map']}
            optional={true}/>

        <Detail
            name={"Ambient Occlusion Map"}
            value={changes['ao_map']}
            optional={true}/>

        <Detail
            name={"Metallic Map"}
            value={changes['metallic_map']}
            optional={true}/>

        <Detail
            name={"Opacity Map"}
            value={changes['opacity_map']}
            optional={true}/>
    </div>;

}
