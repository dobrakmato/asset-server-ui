import React, {useEffect, useState} from "react";
import {compileAll, getAllAssets, getDirtyAssets, subscribeToEvents} from "./api";
import {batch, useDispatch, useSelector} from "react-redux";
import {getFilteredSortedAssets, getStatus, updateDirtyAssets, updateManyAssets} from "./redux";
import {StatusBar} from "./components/StatusBar";
import {Header} from "./components/Header";
import {AssetBrowser} from "./components/AssetBrowser";
import {AssetDetails} from "./components/AssetDetails";
import {FatalErrorOverlay} from "./components/FatalErrorOverlay";

function App() {
    const dispatch = useDispatch();
    const assets = useSelector(getFilteredSortedAssets);
    const status = useSelector(getStatus);

    const [openAsset, setOpenAsset] = useState(null);
    const [selected, setSelected] = useState([]);

    const selectAllHandler = (ev) => {
        if (ev.target.checked) {
            setSelected(assets.map(it => it.uuid))
        } else {
            setSelected([]);
        }
    };

    const selectionChanged = (isChecked, uuid) => {
        if (isChecked) {
            if (!selected.includes(uuid)) {
                setSelected([...selected, uuid]);
            }
        } else {
            setSelected(selected.filter(it => it !== uuid));
        }
    };

    const compileSelected = () => {
        compileAll(selected);
        setSelected([]);
    }

    useEffect(() => {
        (async () => {
            const [assets, dirty] = await Promise.all([getAllAssets(), getDirtyAssets()]);
            batch(() => {
                dispatch(updateManyAssets(assets));
                dispatch(updateDirtyAssets(dirty));
            });
        })();
    }, [dispatch])

    useEffect(() => subscribeToEvents(dispatch), [dispatch]);

    return <>
        <Header compileSelected={compileSelected} selectAllHandler={selectAllHandler} selected={selected}/>
        <main className={"mt-28 mb-14"}>
            <AssetBrowser selected={selected} setOpenAsset={setOpenAsset} selectionChanged={selectionChanged}/>
            {openAsset && <AssetDetails openAsset={openAsset} setOpenAsset={setOpenAsset}/>}
        </main>
        <StatusBar/>
        {status === 'Disconnected' && <FatalErrorOverlay
            title={"Connection interrupted!"}
            message={"The connection to asset server has been interrupted. To prevent user interface from becoming out of sync we disabled the application. Please refresh the window to reconnect to the server. Sorry for the inconvenience."}/>}
    </>;
}

export default App;
