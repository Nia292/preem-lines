import "./Speech.css"

export function Speech() {
    return <>
        <div className="speech-container">
            <span contentEditable tabIndex={1} className="speech-actor cp2077-text">Wakako Okada:</span>
            <span contentEditable tabIndex={2} className="speech-text cp2077-text">So, V? Ready to get this show on the road? I'm telling you, easiest eddies you earned whole year!</span>
        </div>
    </>
}