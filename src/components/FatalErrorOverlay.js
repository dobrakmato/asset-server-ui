export function FatalErrorOverlay({title, message}) {
    return <div className={"fixed inset-0 flex items-center justify-center"}
                style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <div className={"rounded bg-gray-800 shadow p-8 text-white"} style={{width: '700px'}}>
            <h1 className={"text-2xl mb-4"}>{title}</h1>
            <p className={"text-lg leading-relaxed"}>{message}</p>
        </div>
    </div>;
}
