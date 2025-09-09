import { useEffect, useState } from "react";
import "./upscaling.css";


export default function Upscaling({upscaling, setUpscaling, mapSize}) {

    const [options, setOptions] = useState([]);


    useEffect(() => {
        const biggestSide = Math.max(mapSize.width, mapSize.height);
        let newOptions = [];

        for (let i = 0; i <= Math.log2(8192 / 128 / biggestSide); i++) {
            newOptions.push(Math.pow(2, i));
        }

        setOptions(newOptions);
    }, [mapSize]);


    const getOption = (i) => {
        return <div key={i} className={`option card${upscaling === i ? " active" : ""}`} onClick={() => setUpscaling(i)}>
            <div className="value">{i === 1 ? "None" : `x${i}`}</div>
            <div className="resolution">{128 * mapSize.width * i}x{128 * mapSize.height * i}</div>
        </div>
    }


    return <section id="upscaling">
        <div className="section-title">Upscaling</div>
        <div className="options" style={{gridTemplateColumns: `repeat(${Math.min(4, options.length)}, 1fr)`}}>
            {options.map(i => getOption(i))}
        </div>
    </section>
    
}
