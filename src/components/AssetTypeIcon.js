import {IconImage} from "./IconImage";
import {IconCube} from "./IconCube";
import {IconMaterial} from "./IconMaterial";
import React from "react";

export const AssetTypeIcon = React.memo(({type}) => {
    if (!type) {
        return;
    }

    switch (type) {
        case 'Image':
            return <IconImage/>
        case 'Mesh':
            return <IconCube/>
        case 'Material':
            return <IconMaterial/>
        default:
            return '';
    }
});
