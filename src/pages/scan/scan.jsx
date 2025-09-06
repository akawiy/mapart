import {useState, useEffect, useRef} from "react";
import MapView from "./map_view/map_view";
import MapSize from "./map_size/map_size";
import Arrangement from "./arrangement/arrangement";

import "./scan.css";


export default function ScanPage({}) {

    const [mapSize, setMapSize] = useState({width: 4, height: 4});
    const [showGrid, setShowGrid] = useState(false);
    const [data, setData] = useState({});
    const [arrangement, setArrangement] = useState([]);


    useEffect(() => {
        document.title = `Minecraft Map Scanner \u2013 Mapart.fun`;
    }, []);


    return (
        <div id="scan-page">
            <MapView {...{data, mapSize, showGrid, arrangement}} setData={v => setData(v)} />
            <div className="settings">
                <MapSize {...{mapSize, showGrid}} setMapSize={v => setMapSize(v)} setShowGrid={v => setShowGrid(v)} />
                <Arrangement {...{mapSize, arrangement}} setArrangement={v => setArrangement(v)} />
            </div>
        </div>
    );

}
