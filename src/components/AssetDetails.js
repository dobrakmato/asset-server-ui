import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAsset, updateAssetCompilations} from "../redux";
import {Breadcrumbs} from "./Breadcrumbs";
import {CloseButton} from "./CloseButton";
import {Tag} from "./Tag";
import {Compilations} from "./Compilations";
import {compileAll, getAssetCompilations, ignoreAsset, updateAsset, watchAsset} from "../api";
import {useKeyDown, useKeyUp} from "../hooks/useKeyUp";
import {durationToSeconds} from "../utility";
import {Detail} from "./Detail";
import {AssetTypeIcon} from "./AssetTypeIcon";
import {ImportSettings} from "./ImportSettings";
import {PrimaryButton} from "./PrimaryButton";
import {IconSave} from "./IconSave";
import {Button} from "./Button";
import {IconCompile} from "./IconCompile";
import {IconProperties} from "./IconProperties";
import {IconInformation} from "./IconInformation";
import {IconPreview} from "./IconPreview";
import {IconClipboard} from "./IconClipboard";
import {Preview} from "./Preview";

export function AssetDetails({openAsset, setOpenAsset}) {
    const dispatch = useDispatch();
    const asset = useSelector(getAsset(openAsset));
    const {compilations, ...assetWithoutCompilations} = asset;
    const [isLoadingCompilations, setLoadingCompilations] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const [isCompiling, setCompiling] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [changes, setChanges] = useState(assetWithoutCompilations);

    const setValue = (name, value) => {
        setDirty(true);
        setChanges({...changes, [name]: value});
    }

    const avgCompilationTime = useMemo(() => {
        if (compilations && compilations.length > 0) {
            return compilations.reduce((prev, curr) => prev + durationToSeconds(curr.duration), 0) / compilations.length
        }
        return 0;
    }, [compilations]);

    /* subscribe to automatically receive asset updates */
    useEffect(() => {
        watchAsset(openAsset);
        return () => ignoreAsset(openAsset);
    }, [openAsset]);

    /* retrieve additional information */
    useEffect(() => {
        setLoadingCompilations(true);
        getAssetCompilations(openAsset)
            .then(it => {
                dispatch(updateAssetCompilations(openAsset, it));
                setLoadingCompilations(false);
            })
    }, [dispatch, openAsset]);

    const save = useCallback(() => {
        setSaving(true);
        setDirty(false);
        updateAsset(openAsset, changes)
            .then(_ => setSaving(false));
    }, [openAsset, changes]);

    const compileSelf = useCallback(() => {
        setCompiling(true);
        compileAll([openAsset]);
    }, [openAsset]);

    useEffect(() => {
        if (asset?.compilationStatus?.type !== 'Compiling' && asset?.compilationStatus?.type !== 'Queued') {
            setCompiling(false);
        }
    }, [asset]);

    const isActuallyCompiling = isCompiling || asset?.compilationStatus?.type === 'Compiling' || asset?.compilationStatus?.type === 'Queued';

    // esc
    useKeyUp(27, useCallback(() => setOpenAsset(null), [setOpenAsset]));
    // ctrl+s
    useKeyDown(83, save, {ctrlKey: true});

    return <div className={"fixed bg-white dark:bg-gray-800 top-0 w-full h-full"}>
        <div className={"py-4 px-6 flex items-center border-b border-gray-200 dark:border-gray-600"}>
            <div>
                <h2 className={"text-xl dark:text-white"}>Asset Details {dirty &&
                <span className={"font-bold"}>(unsaved changes)</span>}</h2>
                <div className={"group flex items-center"}>
                    <Breadcrumbs path={asset.name}/>
                    <div className={"ml-2"}>
                        <IconClipboard copyText={asset.name}/>
                    </div>
                </div>
            </div>
            <div className={"ml-auto flex items-center"}>
                <div className={"mr-2"}>
                    <PrimaryButton disabled={!dirty} loading={isSaving} icon={<IconSave/>}
                                   click={save}>Save</PrimaryButton>
                </div>
                <div className={"mr-8"}>
                    <Button loading={isActuallyCompiling} icon={<IconCompile/>} click={compileSelf}>Compile</Button>
                </div>
                <CloseButton click={() => setOpenAsset(null)}/>
            </div>
        </div>
        <div className={"px-6 flex flex-row"}>
            <div className={"w-8/12 flex flex-row overflow-y-auto"} style={{maxHeight: 'calc(100vh - 8.9rem)'}}>
                <div className={"w-1/2 pr-6"}>
                    <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200 flex items-center"}>
                        <IconInformation/> Details</h3>
                    <div className={"my-4 flex flex-col"}>
                        <Detail name={"UUID"} value={asset.uuid}/>
                        <Detail name={"Type"} image={<AssetTypeIcon type={asset.type}/>} value={asset.type}/>
                        {asset.input_path && <Detail name={"Source File"} value={asset.input_path}/>}
                        <Detail name={"Updated at"} value={asset.updated_at}/>
                        <Detail name={"Tags"} value={asset.tags.map(it => <Tag key={it} name={it}/>)} type={'custom'}/>
                    </div>

                    <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200 flex items-center"}>
                        <IconCompile className={"w-5 h-5 mr-2 text-gray-500"}/> Compilations</h3>
                    <div className={"my-4 flex flex-col"}>
                        <Detail name={"Average compilation time"} value={avgCompilationTime.toFixed(2) + ' secs'}/>
                        <Detail name={"Compilation status"} value={asset?.compilationStatus?.type}/>
                    </div>
                    <Compilations compilations={compilations}/>

                </div>
                <div className={"w-1/2 pr-6"}>
                    <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200 flex items-center"}>
                        <IconProperties/> Import settings</h3>

                    <ImportSettings changes={changes} setValue={setValue} asset={asset}/>
                </div>
            </div>
            <div className={"w-4/12 pl-6"}>
                {compilations?.[0]?.error && <>
                    <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200"}>Last Compilation
                        Error</h3>
                    <pre className={"overflow-auto dark:text-gray-100"}>
                    {compilations?.[0].error}
                    </pre>
                </>}

                <h3 className={"font-bold text-lg mt-4 text-gray-800 dark:text-gray-200 flex items-center"}>
                    <IconPreview/> Preview</h3>

                <div className={"my-4 flex flex-col"}>
                    <Preview uuid={asset.uuid}/>
                </div>

            </div>
        </div>
    </div>;
}
