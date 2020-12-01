import {SearchInput} from "./SearchInput";
import {Button} from "./Button";
import {IconRefresh} from "./IconRefresh";
import {IconCompile} from "./IconCompile";
import React, {useState} from "react";
import {getAllAssets, getDirtyAssets, refresh} from "../api";
import {batch, useDispatch, useSelector} from "react-redux";
import {getBrowserFilter, updateBrowserFilter, updateDirtyAssets, updateManyAssets} from "../redux";
import {IconDirty} from "./IconDirty";

export function Header({selected, compileSelected, selectAllHandler}) {
    const dispatch = useDispatch();
    const filter = useSelector(getBrowserFilter);
    const [isRefreshing, setRefreshing] = useState(false);

    const handleSearch = (ev) => {
        dispatch(updateBrowserFilter(ev.target.value));
    };

    const showDirty = () => {
        if (filter.trim() === 'dirty:') {
            dispatch(updateBrowserFilter(''));
        } else {
            dispatch(updateBrowserFilter('dirty:'));
        }
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await refresh();
        const [assets, dirty] = await Promise.all([getAllAssets(), getDirtyAssets()]);
        batch(() => {
            dispatch(updateManyAssets(assets));
            dispatch(updateDirtyAssets(dirty));
        });
        setRefreshing(false);
    }

    return <header className={"flex flex-col fixed top-0 bg-white w-full dark:bg-gray-800"}>
        <div className={"border-b border-gray-200 dark:border-gray-600"}>
            <SearchInput type={"text"} focusKey={'/'} onChange={handleSearch}
                         placeholder={"Search assets... (use '/' to select)"}/>
        </div>
        <div className={"p-2 border-b border-gray-200 dark:border-gray-600 flex items-center"}>
            <div className={"flex items-center"}>
                <input type={"checkbox"} onChange={selectAllHandler} className={"w-6 h-6 ml-4 mr-6"}/>
                <div className={"text-gray-800 font-bold py-2 mr-6 dark:text-gray-200"}>{selected.length} selected</div>
                <div className={"px-2"}>
                    <Button disabled={selected.length === 0}>Edit</Button>
                    <Button click={compileSelected} disabled={selected.length === 0}>Compile</Button>
                </div>
            </div>
            <div className={"ml-auto"}>
                <Button click={showDirty} icon={<div className={"mr-2"}><IconDirty/>
                </div>}>Show {filter.trim() === 'dirty:' ? 'All' : 'Dirty'}</Button>
                <Button loading={isRefreshing} icon={<IconRefresh/>} click={handleRefresh}>Refresh</Button>
                <Button><IconCompile/> Recompile All</Button>
            </div>
        </div>
    </header>;
}
