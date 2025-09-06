import {useState, useEffect, useRef, use} from "react";
import {Buffer} from "buffer";
import {decode} from "nbt-ts";
import {ungzip} from "pako";
import UploadIcon from "../../../components/icons/upload";
import { parseCSV } from "../../../utils/csv";
import DownloadIcon from "../../../components/icons/download";

import "./map_view.css";


window.Buffer = Buffer;


export default function MapView({data, setData, mapSize, showGrid, arrangement}) {

    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d", {willReadFrequently: true});
        if (!context) return;

        context.imageSmoothingEnabled = false;
        canvas.width = mapSize.width * 128;
        canvas.height = mapSize.height * 128;

        const canvasAspectRatio = canvas.width / canvas.height;
        if (canvasAspectRatio > 1) {
            canvas.style.width = "25em";
            canvas.style.height = "unset";
        } else {
            canvas.style.width = "unset";
            canvas.style.height = "25em";
        }
    }, [data, mapSize]);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d", {willReadFrequently: true});
        if (!context) return;
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        for (let mapX = 0; mapX < mapSize.width; mapX++) {
            for (let mapY = 0; mapY < mapSize.height; mapY++) {
                const mapId = arrangement[mapY][mapX];

                if (!data[mapId]) {
                    for (let x = 0; x < 128; x++) {
                        for (let y = 0; y < 128; y++) {
                            let actualX = mapX * 128 + x;
                            let actualY = mapY * 128 + y;

                            imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 0] = 0;
                            imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 1] = 0;
                            imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 2] = 0;
                            imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 3] = 0;
                        }
                    }
                } else {
                    const mapData = data[mapId];

                    for (let i = 0; i < mapData.length; i++) {
                        let x = i % 128;
                        let y = Math.floor(i / 128);
                        let actualX = mapX * 128 + x;
                        let actualY = mapY * 128 + y;

                        imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 0] = mapData[i][0];
                        imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 1] = mapData[i][1];
                        imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 2] = mapData[i][2];
                        imageData.data[actualY * mapSize.width * 128 * 4 + actualX * 4 + 3] = mapData[i][3];
                    }
                }
            }
        }

        context.putImageData(imageData, 0, 0);
    }, [data, arrangement]);


    const onUpload = async function(event) {
        const newData = {};

        let colorPalette = Object.fromEntries((await parseCSV("/color_palettes/2724.csv"))
                                 .map(row => [(row.id + 256) % 256, [row.r, row.g, row.b, 255]]));
        for (let i = 0; i < 4; i++) {
            colorPalette[i] = [0, 0, 0, 0];
        }
        
        for (let file of event.target.files) {
            let mapId;
            if (!file.name.startsWith("map_") || !file.name.endsWith(".dat") || isNaN(file.name.slice(4, -4))) {
                continue;
            } else {
                mapId = +file.name.slice(4, -4);
            }

            let nbt;
            try {
                nbt = decode(Buffer.from(ungzip(new Uint8Array(await file.arrayBuffer()))));
            } catch (e) {
                continue;
            }

            if (!nbt.value) {
                continue;
            }

            let dataVersion;
            if (!nbt.value.DataVersion || isNaN(nbt.value.DataVersion)) {
                continue;
            } else {
                dataVersion = +nbt.value.DataVersion;
            }

            let colors;
            if (!nbt.value.data || !nbt.value.data.colors) {
                continue;
            } else {
                colors = Array.from(nbt.value.data.colors).map(color => colorPalette[color]);
            }
            
            // let currentDataVersionGroup = 0;
            // if (dataVersion >= 2724) {
            //     currentDataVersionGroup = 2;
            // } else if (dataVersion >= 2566) {
            //     currentDataVersionGroup = 1;
            // }
            let currentDataVersionGroup = 2;

            if (!newData[currentDataVersionGroup]) {
                newData[currentDataVersionGroup] = {};
            }
            newData[currentDataVersionGroup][mapId] = colors;
        }

        let finalDataVersionGroup = Object.keys(newData)[0];
        let result = {};
        for (let i of Object.keys(newData)) {
            if (Object.keys(newData[i]).length > Object.keys(result).length) {
                result = newData[i];
                finalDataVersionGroup = i;
            }
        }

        if (Object.keys(newData).length === 0) {
            alert("Couldn't recognize any of the uploaded maps. Please make sure you are uploading valid Java Edition 1.12+ map_n.dat-like files");
            return;
        }
        
        setData(newData[finalDataVersionGroup]);
    }

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "map.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    return (
        <div id="map-view">
            <input type="file" id="maps-input" accept=".dat" multiple onChange={onUpload} />
            {Object.keys(data).length !== 0 && <div id="canvas-container">
                <canvas id="image-canvas" ref={canvasRef}></canvas>
                {showGrid && <div id="image-grid" style={{"--width": mapSize.width}}>
                    {Array.from({length: mapSize.width * mapSize.height}).map(index => <div key={index}></div>)}
                </div>}
            </div>}
            {Object.keys(data).length === 0 && <label htmlFor="maps-input" className="initial-upload">
                <UploadIcon></UploadIcon>
                <div className="text">Upload maps</div>
            </label>}
            {Object.keys(data).length !== 0 ? <div className="icons">
                <label htmlFor="maps-input" className="icon upload" title="Reupload maps"><UploadIcon></UploadIcon></label>
                <button className="icon download" title="Download map.png" onClick={download}><DownloadIcon></DownloadIcon></button>
            </div> : null}
        </div>
    );
    
}
