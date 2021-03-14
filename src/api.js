import {
    sseAssetCompilationStatus,
    sseAssetDirtyStatus,
    sseAssetRemoved,
    sseAssetUpdate,
    sseCompilerStatus,
    updateAssetCompilations,
    updateStatus
} from "./redux";
import {batch} from "react-redux";

const API_URL = localStorage.getItem('API_URL') ?? 'http://localhost:8000';

const WATCH_LIST = [];

export function watchAsset(uuid) {
    if (!WATCH_LIST.includes(uuid)) {
        WATCH_LIST.push(uuid)
    }
}

export function ignoreAsset(uuid) {
    WATCH_LIST.splice(WATCH_LIST.indexOf(uuid), 1);
}

export async function getAllAssets() {
    return fetch(`${API_URL}/assets`)
        .then(it => it.json())
}

export async function getDirtyAssets() {
    return fetch(`${API_URL}/assets/dirty`)
        .then(it => it.json())
}

export async function getAsset(uuid) {
    return fetch(`${API_URL}/assets/${uuid}`)
        .then(it => it.json())
}

export async function updateAsset(uuid, asset) {
    return fetch(`${API_URL}/assets/${uuid}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(asset),
    }).then(it => it.json())
}

export async function getAssetCompilations(uuid) {
    return fetch(`${API_URL}/assets/${uuid}/compilations`)
        .then(it => it.json())
}

export function getAssetPreviewUrl(uuid) {
    return `${API_URL}/assets/${uuid}/preview`;
}

export async function compileAll(uuids) {
    return fetch(`${API_URL}/compile`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({assets: uuids}),
    }).then(it => it.json())
}

export async function refresh() {
    return fetch(`${API_URL}/refresh`, {method: 'POST'}).then(it => it.json())
}

export function subscribeToEvents(dispatch) {
    // this is to prevent server from ddos-ing our application by requesting 1000 of renders
    const dispatcherInterval = 250;
    let toDispatch = [];
    setInterval(() => {
        if (toDispatch.length > 0) {
            batch(() => {
                for (const x of toDispatch) {
                    dispatch(x);
                }
                toDispatch = [];
            })
        }
    }, dispatcherInterval);

    const evtSource = new EventSource(`${API_URL}/events`);
    evtSource.onopen = () => dispatch(updateStatus('Connected'));
    evtSource.onerror = () => dispatch(updateStatus('Disconnected'));
    evtSource.onmessage = function (event) {
        if (event.data) {
            try {
                const json = JSON.parse(event.data);

                switch (json.type) {
                    case 'AssetUpdate':
                        toDispatch.push(sseAssetUpdate(json.asset))
                        break;
                    case 'AssetRemoved':
                        toDispatch.push(sseAssetRemoved(json.uuid))
                        break;
                    case 'AssetDirtyStatus':
                        toDispatch.push(sseAssetDirtyStatus(json.uuid, json.is_dirty))
                        break;
                    case 'AssetCompilationStatus':
                        toDispatch.push(sseAssetCompilationStatus(json.uuid, json.status))

                        if (WATCH_LIST.includes(json.uuid)) {
                            getAssetCompilations(json.uuid)
                                .then(it => toDispatch.push(updateAssetCompilations(json.uuid, it)))
                        }

                        break;
                    case 'CompilerStatus':
                        toDispatch.push(sseCompilerStatus(json.queued, json.concurrency, json.eta.secs))
                        break;
                    case 'ScanResults':
                        // todo: trigger tooltip somehow?
                        console.log('scan results', json.results);
                        break;
                    default:
                        break;
                }
            } catch (e) {
            }
        }
    }
}
