import {Loader} from "./Loader";
import {getAssetPreviewUrl} from "../api";
import {useEffect, useMemo, useState} from "react";
import {IconX} from "./IconX";

export function Preview({uuid}) {
    const [isLoadingPreview, setLoadingPreview] = useState(true);
    const [isError, setError] = useState(false);
    const [src, setSrc] = useState('');
    const [details, setDetails] = useState('');

    const previewUrl = useMemo(() => getAssetPreviewUrl(uuid), [uuid]);

    useEffect(() => {
        if (!previewUrl) return;

        setLoadingPreview(true);
        setError(false);

        let active = true;
        const img = new Image();
        img.onload = () => {
            if (active) {
                setLoadingPreview(false);
                setSrc(previewUrl);

                const mips = Math.floor(Math.log2(Math.max(img.naturalWidth, img.naturalHeight)));

                setDetails(`${img.naturalWidth}X${img.naturalWidth} px, ${mips} mips`);
            }
        }
        img.onerror = () => {
            if (active) {
                setLoadingPreview(false);
                setError(true);

                setDetails(`Preview unavailable for this asset.`);
            }
        }
        img.src = previewUrl;
        return () => active = false;
    }, [previewUrl]);

    return <>
        <div style={{minHeight: '30rem'}}
             className={"bg-gray-100 dark:bg-gray-900 w-full flex items-center justify-center rounded"}>
            {isLoadingPreview && <Loader className={"w-5 h-5 mr-2 text-gray-300"}/>}
            {(!isLoadingPreview && !isError) && <img alt={"preview"} className={"w-full rounded"} src={src}/>}
            {isError && <IconX className={"w-5 h-5 mr-2 text-gray-300"}/>}
        </div>
        {
            !isLoadingPreview &&
            <p className={"text-gray-400 uppercase tracking-wide text-xs mt-2"}>{details}</p>
        }
    </>
}
