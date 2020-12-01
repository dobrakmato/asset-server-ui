import React, {useCallback, useEffect, useMemo, useState} from "react";

Array.range = (from, to, step) =>
    [...Array(Math.floor((to - from) / step))].map((_, i) => from + i * step);


export function useVirtualized({parentRef, rows, rowSize, rowRender, spacerRender, overscan}) {
    overscan = overscan || 3;
    const [scrollTop, setScrollTop] = useState(0);

    const scrollHandler = useCallback(() => {
        setScrollTop(parentRef.current.scrollTop);
    }, [parentRef]);

    useEffect(() => {
        if (parentRef.current) {
            const curr = parentRef.current;
            curr.addEventListener('scroll', scrollHandler)
            return () => curr.removeEventListener('scroll', scrollHandler);
        }
    }, [parentRef, scrollHandler]);

    const height = parentRef?.current?.clientHeight ?? 0;

    const firstItemIdx = Math.max(0, Math.floor(scrollTop / rowSize) - overscan);
    let lastItemIdx = Math.min(firstItemIdx + Math.ceil(height / rowSize) + 2 * overscan, Math.max(0, rows));

    if (lastItemIdx < firstItemIdx) {
        if (parentRef.current) {
            parentRef.current.scrollTop = 0;
        }
        lastItemIdx = firstItemIdx;
    }

    const range = useMemo(() => Array.range(firstItemIdx, lastItemIdx, 1), [firstItemIdx, lastItemIdx]);

    const topOffset = firstItemIdx * rowSize;
    const bottomOffset = (rows - lastItemIdx) * rowSize;

    const renderRows = useCallback(() => {
        return <>
            {spacerRender({height: topOffset, display: 'block'})}
            {range.map(it => rowRender(it))}
            {spacerRender({height: bottomOffset, display: 'block'})}
        </>;
    }, [topOffset, bottomOffset, spacerRender, rowRender, range]);

    return {renderRows};
}
