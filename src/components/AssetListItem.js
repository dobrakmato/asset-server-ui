import React, {useMemo} from "react";
import {IconChevronRight} from "./IconChevronRight";
import {formatDistanceToNow, parseISO} from 'date-fns';
import {Breadcrumbs} from "./Breadcrumbs";
import {Tag} from "./Tag";
import {IconDirty} from "./IconDirty";
import {IconCompiling} from "./IconCompiling";
import {IconQueued} from "./IconQueued";
import {IconError} from "./IconError";
import {AssetTypeIcon} from "./AssetTypeIcon";
import {useDispatch} from "react-redux";
import {updateBrowserFilter} from "../redux";

export const AssetListItem = React.memo(({asset, selected, onClick, onSelectionChanged}) => {
    const dispatch = useDispatch();

    let statusIcon = useMemo(() => {
        if (asset.compilationStatus) {
            if (asset.compilationStatus.type === 'Queued') {
                return <IconQueued/>;
            } else if (asset.compilationStatus.type === 'Compiling') {
                return <IconCompiling/>;
            } else if (asset.compilationStatus.type === 'Error') {
                return <IconError/>;
            }
        }

        if (asset.dirty) {
            return <IconDirty/>;
        }

    }, [asset]);

    const handleCheckbox = (ev) => onSelectionChanged(ev.target.checked, asset.uuid);

    return <div
        className="dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-200 hover:bg-gray-50 group flex items-center">
        <div className="px-6 py-4 w-8 whitespace-no-wrap">
            <input type={"checkbox"} onChange={handleCheckbox} checked={selected} className={"w-6 h-6 dark:bg-gray-900"}/>
        </div>
        <div className="px-6 py-4 w-20 whitespace-no-wrap flex justify-center">
            {statusIcon}
        </div>
        <div className="px-6 py-4 w-20 whitespace-no-wrap">
            <AssetTypeIcon type={asset.type}/>
        </div>
        <div className="px-6 py-4 w-1/6 whitespace-no-wrap">
            {asset.tags && asset.tags.map(it => <Tag key={it} name={it} style={{cursor: 'pointer'}}
                                                     onClick={() => dispatch(updateBrowserFilter(it))}/>)}
        </div>
        <div className="px-6 py-4 w-1/2 whitespace-no-wrap">
            <Breadcrumbs path={asset.name} clickable={true} />
        </div>
        <div className="px-6 py-4 w-64 whitespace-no-wrap">
            {asset.updated_at && formatDistanceToNow(parseISO(asset.updated_at))}
        </div>
        <div className="px-6 py-4 w-32 whitespace-no-wrap cursor-pointer" onClick={onClick}>
            <IconChevronRight/>
        </div>
    </div>;
});
