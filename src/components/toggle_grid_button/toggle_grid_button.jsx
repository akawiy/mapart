import "./toggle_grid_button.css";


export default function ToggleGridButton({showGrid, setShowGrid}) {

    return <button className={`toggle-grid-button${showGrid ? " active" : ""}`} onClick={() => setShowGrid(v => !v)}>
                Show grid: {showGrid ? "on" : "off"}
            </button>;

}
