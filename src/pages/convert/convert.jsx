import {useState, useEffect, useRef} from "react";
import ImageView from "./image_view/image_view";
import MinecraftVersion from "./minecraft_version/minecraft_version";
import MapSize from "./map_size/map_size";
import ScalingMode from "./scaling_mode/scaling_mode";
import StartingMapID from "./starting_map_id/starting_map_id";
import Dithering from "./dithering/dithering";
import Footer from "../../components/footer/footer";

import "./convert.css";


export default function ConvertPage({}) {

    const [imageFile, setImageFile] = useState(null);
    const [imageFileSize, setImageFileSize] = useState({width: 0, height: 0});
    const [showGrid, setShowGrid] = useState(false);
    const canvasRef = useRef(null);

    const [minecraftVersion, setMinecraftVersion] = useState(null);
    const [mapSize, setMapSize] = useState({width: 1, height: 1});
    const [scalingMode, setScalingMode] = useState(null);
    const [startingMapID, setStartingMapID] = useState(0);
    const [dithering, setDithering] = useState(null);


    useEffect(() => {
        document.title = `Image to Minecraft Map Converter \u2013 Mapart.fun`
    }, []);


    return (
        <div id="convert-page">
            <ImageView {...{imageFile, showGrid, canvasRef, minecraftVersion, mapSize, scalingMode, startingMapID, dithering}}
                setImageFile={v => setImageFile(v)}
                setImageFileSize={v => setImageFileSize(v)} />
            <div className="settings">
                <MinecraftVersion {...{minecraftVersion}} 
                    setMinecraftVersion={v => setMinecraftVersion(v)} />
                <MapSize {...{imageFileSize, showGrid, mapSize}}
                    setMapSize={v => setMapSize(v)}
                    setShowGrid={v => setShowGrid(v)} />
                {(imageFileSize.width / imageFileSize.height != mapSize.width / mapSize.height) ? <ScalingMode {...{imageFileSize, scalingMode}}
                    setScalingMode={v => setScalingMode(v)} /> : null}
                <StartingMapID {...{mapSize, startingMapID}}
                    setStartingMapID={v => setStartingMapID(v)} />
                <Dithering {...{dithering}} 
                    setDithering={v => setDithering(v)} />
                <Footer />
            </div>
        </div>
    );

}
