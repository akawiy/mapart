import {useState, useEffect, useRef} from "react";
import MapView from "./map_view/map_view";
import MapSize from "./map_size/map_size";
import Arrangement from "./arrangement/arrangement";
import Footer from "../../components/footer/footer";

import "./scan.css";
import Upscaling from "./upscaling/upscaling";


export default function ScanPage({}) {

    const [mapSize, setMapSize] = useState({width: 8, height: 4});
    const [showGrid, setShowGrid] = useState(false);
    const [data, setData] = useState({});
    const [arrangement, setArrangement] = useState([]);
    const [upscaling, setUpscaling] = useState(4);


    useEffect(() => {
        document.title = `Minecraft Map Scanner \u2013 Mapart.fun`;
    }, []);


    return (
        <div id="scan-page">
            <MapView {...{data, mapSize, showGrid, arrangement, upscaling}} setData={v => setData(v)} />
            <div className="settings">
                <MapSize {...{mapSize, showGrid}} setMapSize={v => setMapSize(v)} setShowGrid={v => setShowGrid(v)} />
                <Arrangement {...{mapSize, arrangement}} setMapSize={v => setMapSize(v)} setArrangement={v => setArrangement(v)} />
                <Upscaling {...{upscaling, mapSize}} setUpscaling={v => setUpscaling(v)} />
                <Footer />
            </div>
        </div>
    );

}
