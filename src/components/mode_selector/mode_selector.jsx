import "./mode_selector.css";


export default function ModeSelector({modes, currentMode, setCurrentMode}) {

    return (
        <div className="mode-selector">
            {modes.map(mode => (
                <div className={`mode${(currentMode === mode) ? " active" : ""}`} onClick={() => setCurrentMode(mode)} key={mode}>{mode}</div>
            ))}
        </div>
    );

}
