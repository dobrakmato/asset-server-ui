/* action creators */
import {createSelector} from "reselect";

export const sseAssetUpdate = (asset) => ({type: 'sseAssetUpdate', asset})
export const sseAssetRemoved = (uuid) => ({type: 'sseAssetRemoved', uuid})
export const sseAssetDirtyStatus = (uuid, isDirty) => ({type: 'sseAssetDirtyStatus', uuid, isDirty})
export const sseAssetCompilationStatus = (uuid, status) => ({type: 'sseAssetCompilationStatus', uuid, status})
export const sseCompilerStatus = (queued, concurrency, eta) => ({type: 'sseCompilerStatus', queued, concurrency, eta})

export const updateManyAssets = (assets) => ({type: 'updateManyAssets', assets})
export const updateAsset = (asset) => ({type: 'updateAsset', asset})
export const updateDirtyAssets = (dirtyUuids) => ({type: 'updateDirtyAssets', dirtyUuids})
export const updateAssetCompilations = (uuid, compilations) => ({type: 'updateAssetCompilations', compilations, uuid})
export const updateStatus = (status) => ({type: 'updateStatus', status})

export const updateBrowserFilter = (filter) => ({type: 'updateBrowserFilter', filter})
export const updateBrowserSort = (sortBy, direction) => ({type: 'updateBrowserSort', sortBy, direction})

/* initial state */
const INITIAL_STATE = {
    assets: {},
    status: 'Disconnected',
    compiler: {
        eta: 0,
        concurrency: 0,
        queued: 0,
    },
    browser: {
        filter: '',
        sortBy: 'name',
        sortDir: 'asc',
    }
};

/* main reducer */
export function rootReducer(state = INITIAL_STATE, action) {
    let assets; // hack because js is retarded

    switch (action.type) {
        case 'updateManyAssets':
            assets = {...state.assets};

            for (let asset of action.assets) {
                assets[asset.uuid] = asset;
            }

            return {...state, assets};
        case 'updateAsset':
            return {
                ...state,
                assets: {...state.assets, ...{[action.asset.uuid]: {...state.assets[action.asset.uuid], ...action.asset}}}
            };
        case 'updateDirtyAssets':
            assets = {...state.assets};

            for (let uuid of action.dirtyUuids) {
                assets[uuid] = {...assets[uuid]};
                assets[uuid].dirty = true;
            }

            return {...state, assets};
        case 'updateAssetCompilations':
            assets = {
                ...state.assets,
                [action.uuid]: {...state.assets[action.uuid], compilations: action.compilations}
            };

            return {...state, assets};
        case 'updateStatus':
            return {...state, status: action.status};
        case 'sseAssetUpdate':
            return {
                ...state,
                assets: {...state.assets, ...{[action.asset.uuid]: {...state.assets[action.asset.uuid], ...action.asset}}}
            };
        case 'sseAssetRemoved':
            assets = {...state.assets};

            delete assets[action.uuid];
            return {
                ...state,
                assets,
            }
        case 'sseAssetDirtyStatus':
            return {
                ...state,
                assets: {...state.assets, ...{[action.uuid]: {...state.assets[action.uuid], dirty: action.isDirty}}}
            };
        case 'sseAssetCompilationStatus':
            return {
                ...state,
                assets: {
                    ...state.assets, ...{
                        [action.uuid]: {
                            ...state.assets[action.uuid],
                            compilationStatus: action.status
                        }
                    }
                }
            };
        case 'sseCompilerStatus':
            return {...state, compiler: {eta: action.eta, concurrency: action.concurrency, queued: action.queued}};
        case 'updateBrowserFilter':
            return {...state, browser: {...state.browser, filter: action.filter}};
        case 'updateBrowserSort':
            return {...state, browser: {...state.browser, sortBy: action.sortBy, sortDir: action.direction}};
        default:
            return state;
    }
}

/* selectors */
export const getAssets = (state) => Object.values(state.assets)
export const getBrowserSort = (state) => [state.browser.sortBy, state.browser.sortDir]
export const getBrowserFilter = (state) => state.browser.filter
export const getSortedAssets = createSelector(
    getAssets, getBrowserSort,
    (assets, [sortBy, sortDir]) => {
        const result = [...assets];
        result.sort((a, b) => {
            if (sortDir === 'asc') {
                return a[sortBy] === b[sortBy] ? 0 : a[sortBy] < b[sortBy] ? -1 : 1;
            } else {
                return a[sortBy] === b[sortBy] ? 0 : a[sortBy] > b[sortBy] ? -1 : 1
            }
        });
        return result;
    }
);
export const getFilteredSortedAssets = createSelector(
    getSortedAssets, getBrowserFilter,
    (sortedAssets, filter) => sortedAssets.filter(it => {
        const filterLower = filter.toLowerCase();

        for (const prop of ['name', 'type', 'tags']) {
            if (it[prop]) {
                if (typeof it[prop] === 'string' && it[prop].toLowerCase().includes(filterLower)) {
                    return true;
                } else if (Array.isArray(it[prop]) && it[prop].some(it => it.toLowerCase().includes(filterLower))) {
                    return true;
                }
            }
        }

        return false;
    })
)

export const getAsset = (uuid) => (state) => state.assets[uuid]
export const getStatus = (state) => state.status
export const getCompilerStatus = (state) => state.compiler
