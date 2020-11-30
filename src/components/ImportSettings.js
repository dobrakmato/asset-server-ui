import React from "react";
import {ImageImportSettings} from "./ImageImportSettings";
import {MeshImportSettings} from "./MeshImportSettings";
import {MaterialImportSettings} from "./MaterialImportSettings";

export function ImportSettings({asset, changes, setValue}) {

    let content;
    switch (asset.type) {
        case 'Image':
            content = <ImageImportSettings changes={changes} setValue={setValue}/>
            break;
        case 'Mesh':
            content = <MeshImportSettings changes={changes} setValue={setValue}/>
            break;
        case 'Material':
            content = <MaterialImportSettings changes={changes} setValue={setValue}/>
            break;
        default:
            content = 'Unsupported asset type';
    }

    return <div className={"mb-16"}>
        {content}
    </div>;
}
