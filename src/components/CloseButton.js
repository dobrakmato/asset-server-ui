import React from "react";

export function CloseButton({disabled, click}) {
    const disabledClasses = disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-400 text-gray-800';
    return <button type="button"
                   disabled={disabled}
                   className={"font-bold p-2 rounded-full inline-flex items-center " + disabledClasses}
                   onClick={click}>
        <svg className={"w-8 h-8"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
}
