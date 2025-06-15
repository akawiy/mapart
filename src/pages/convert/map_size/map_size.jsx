import {useState, useEffect} from "react";
import itemFrame from "../../../assets/item_frame.png";
import ModeSelector from "../../../components/mode_selector/mode_selector";
import NumberInput from "../../../components/number_input";

import "./map_size.css";


export default function MapSize({imageFileSize, showGrid, setShowGrid, mapSize, setMapSize}) {

    const defaultRecommendedSizes = [
        {width: 1, height: 1},
        {width: 1, height: 2},
        {width: 2, height: 1},
        {width: 2, height: 2},
        {width: 2, height: 3},
        {width: 3, height: 2},
        {width: 3, height: 3},
        {width: 4, height: 4},
    ];

    const [currentMode, setCurrentMode] = useState("recommended");
    const [recommendedSizes, setRecommendedSizes] = useState(defaultRecommendedSizes);


    useEffect(() => {
        if (imageFileSize.width === 0 || imageFileSize.height === 0) {
            setRecommendedSizes(defaultRecommendedSizes);
            return;
        }

        const aspectRatio = imageFileSize.width / imageFileSize.height;
        let sizes = [
            {width: 1, height: 1},
        ];

        let height = 1;
        while (true) {
            const width = Math.round(aspectRatio * height);
            if (width > 16 || height > 16) {
                break;
            } else if (width !== 0) {
                const lastSize = sizes[sizes.length - 1];
                if (lastSize.width != width || lastSize.height != height) {
                    sizes.push({width, height});
                }

                if (sizes.length == 8) {
                    break;
                }
            }

            height++;
        }

        setRecommendedSizes(sizes);
    }, [imageFileSize]);


    const createOption = (size, index) => {
        const itemFrameSize = Math.floor(100 / Math.max(size.width, size.height)) / 20;
        const className = `option card${(size.width === mapSize.width && size.height == mapSize.height) ? " active" : ""}`

        return (
            <div {...{className}} key={index} onClick={() => setMapSize(size)}>
                <div className="item-frames" style={{gridTemplateColumns: `repeat(${size.width}, 1fr)`}}>
                    {Array.from({length: size.width * size.height}).map((_, index2) => {
                        return (<img src={itemFrame} style={{width: `${itemFrameSize}em`, height: `${itemFrameSize}em`}} key={index2}/>)
                    })}
                </div>
                <div className="size">{size.width}x{size.height}</div>
            </div>
        );
    }


    return (
        <section id="map-size">
            <div className="section-title">Map size</div>
            <ModeSelector {...{currentMode}} modes={["recommended", "custom"]} setCurrentMode={v => setCurrentMode(v)} />
            {(currentMode == "recommended") ? <div className="recommended" style={{"--width": Math.min(recommendedSizes.length, 4)}}>
                {recommendedSizes.map(createOption)}
            </div> : null}
            {(currentMode == "custom") ? <div className="custom">
                <NumberInput value={mapSize.width} 
                             setValue={v => setMapSize({width: v, height: mapSize.height})}
                             minValue={1}
                             maxValue={16}
                             defaultValue={1} />
                ×
                <NumberInput value={mapSize.height}
                             setValue={v => setMapSize({width: mapSize.width, height: v})}
                             minValue={1}
                             maxValue={16}
                             defaultValue={1} />
            </div> : null}
            <div className={`show-grid${showGrid ? " active" : ""}`} onClick={() => setShowGrid(v => !v)}>Show grid: {showGrid ? "on" : "off"}</div>
        </section>
    );

}
