import "./progress_bar.css";


export default function ProgressBar({value}) {

    return (
        <div className="progress-bar" style={{"--value": value}}></div>
    );

}
