import React from "react";
import {Compilation} from "./Compilation";

export function Compilations({compilations}) {
    return <div className={"border border-gray-200 dark:border-gray-600 rounded mt-4 mb-16"}>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
            <thead>
            <tr>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Compiled at
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                </th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Result
                </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-600">
            {compilations && compilations.map((it, idx) => <Compilation key={idx} compilation={it}/>)}
            </tbody>
        </table>
    </div>;
}
