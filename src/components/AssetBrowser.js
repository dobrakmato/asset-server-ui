import React, {useCallback, useRef} from "react";
import {AssetListItem} from "./AssetListItem";
import {useDispatch, useSelector} from "react-redux";
import {getBrowserSort, getFilteredSortedAssets, updateBrowserSort} from "../redux";
import {SortIndicator} from "./SortIndicator";
import {useVirtualized} from "../hooks/useVirtualized";

export function AssetBrowser({selected, selectionChanged, setOpenAsset}) {
    const parentRef = useRef();
    const assets = useSelector(getFilteredSortedAssets);
    const dispatch = useDispatch();
    const [sortBy, sortDir] = useSelector(getBrowserSort);

    const setSortBy = (prop) => {
        if (sortBy === prop) {
            if (sortDir === 'asc') {
                dispatch(updateBrowserSort(prop, 'desc'))
            } else {
                dispatch(updateBrowserSort(prop, 'asc'))
            }
        } else {
            dispatch(updateBrowserSort(prop, 'asc'))
        }
    };

    const spacerRender = useCallback((style) => <div className={"bg-white dark:bg-gray-800"} style={style}/>, []);

    const {renderRows} = useVirtualized({
        rows: assets.length,
        parentRef,
        rowSize: 63,
        spacerRender,
        rowRender: (idx) => {
            const it = assets[idx];
            return <AssetListItem key={it.uuid} asset={it}
                                  selected={selected.includes(it.uuid)}
                                  onClick={() => setOpenAsset(it.uuid)}
                                  onSelectionChanged={selectionChanged}/>;
        }
    });

    return <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <div>
            <div className={"flex items-center bg-gray-50 dark:bg-gray-700"}>
                <div
                    className="px-6 py-3 w-8 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"/>
                <div
                    className="px-6 py-3 w-20 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"
                    title={'Status'}
                >
                    <span>Status</span>
                </div>
                <div
                    className="px-6 py-3 w-20 cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"
                    title={'Type'}
                    onClick={() => setSortBy('type')}
                >
                    <span className={"min-w-0 ellipsis truncate"}>Type</span>
                    <SortIndicator prop={'type'} sortBy={sortBy} sortDir={sortDir}/>
                </div>
                <div
                    className="px-6 py-3 w-1/6 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center">
                    <span>Tags</span>
                </div>
                <div
                    className="px-6 py-3 w-1/2 cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"
                    onClick={() => setSortBy('name')}
                >
                    <span className={"min-w-0 ellipsis truncate"}>Asset name</span>
                    <SortIndicator prop={'name'} sortBy={sortBy} sortDir={sortDir}/>
                </div>
                <div
                    className="px-6 py-3 w-64 cursor-pointer bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"
                    onClick={() => setSortBy('updated_at')}
                >
                    <span className={"min-w-0 ellipsis truncate"}>Updated At</span>
                    <SortIndicator prop={'updated_at'} sortBy={sortBy} sortDir={sortDir}/>
                </div>
                <div
                    className="px-6 py-3 w-24 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider flex items-center"/>
            </div>
        </div>
        <div className="bg-white divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll dark:bg-gray-800" ref={parentRef} style={{height: 'calc(100vh - 13rem)'}}>
            {assets && renderRows()}
        </div>
    </div>;
}
