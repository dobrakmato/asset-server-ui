import {useEffect} from "react";

export const useKeyUp = (keyCode, callback, modifiers) => useKey('keyup', keyCode, callback, modifiers);
export const useKeyDown = (keyCode, callback, modifiers) => useKey('keydown', keyCode, callback, modifiers);

export function useKey(event, keyCode, callback, modifiers) {
    useEffect(() => {
        const listener = (e) => {
            const inputSelected = e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'select';

            if (!inputSelected && e.keyCode === keyCode) {
                if (Object.keys({...modifiers}).every(mod => e[mod])) {
                    callback();
                    e.preventDefault();
                    return false;
                }
            }
        }
        document.addEventListener(event, listener);
        return () => document.removeEventListener(event, listener);
    }, [event, modifiers, keyCode, callback]);
}
