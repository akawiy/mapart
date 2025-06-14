import {useEffect, useState} from "react";
import {parseCSV} from "../../../utils/csv";
import {Buffer} from "buffer";
import {encode, Byte, Short, Int} from "nbt-ts";
import {gzip} from "pako";
import heic2any from "heic2any";
import JSZip from "jszip";
import UploadIcon from "../../../components/icons/upload";
import DownloadIcon from "../../../components/icons/download";

import "./image_view.css";


window.Buffer = Buffer;


export default function ImageView({imageFile, setImageFile, setImageFileSize, showGrid, canvasRef, 
    minecraftVersion, mapSize, scalingMode, startingMapID, dithering}) {

    const [colorPalette, setColorPalette] = useState({});
    const [colorIDs, setColorIDs] = useState([]);
    const [previewDone, setPreviewDone] = useState(false);


    useEffect(() => {
        let colorPalettePath = "../src/color_palettes/2724.csv";
        if (1139 <= minecraftVersion && minecraftVersion <= 2225) {
            colorPalettePath = "../src/color_palettes/1139.csv";
        } else if (minecraftVersion === 2566) {
            colorPalettePath = "../src/color_palettes/2566.csv";
        }

        parseCSV(colorPalettePath)
        .then(result => setColorPalette(Object.fromEntries(result.map(row => [row.id, [row.r, row.g, row.b]]))));
    }, [minecraftVersion]);


    useEffect(async () => {
        if (!imageFile) return;

        if (imageFile.type === "image/heic" || imageFile.name.endsWith(".heic")) {
            const blob = await heic2any({
                blob: imageFile,
                toType: "image/png",
                quality: 1,
            });

            imageFile = new File([blob], imageFile.name.replace(/\.heic$/, ".png"), {
                type: "image/png",
            });
        }

        const reader = new FileReader();
        const worker = new Worker(new URL("../../../utils/image_processing.js", import.meta.url), {type: "module"});

        reader.onload = event => {
            const image = new Image();

            image.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const context = canvas.getContext("2d", {willReadFrequently: true});
                if (!context) return;
                setPreviewDone(false);
                setImageFileSize({width: image.width, height: image.height});

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
                
                let scale = 1, x = 0, y = 0;
                if (scalingMode === "crop") {
                    scale = Math.max(canvas.width / image.width, canvas.height / image.height);
                    x = (canvas.width - image.width * scale) / 2;
                    y = (canvas.height - image.height * scale) / 2;
                    context.drawImage(image, x, y, image.width * scale, image.height * scale);
                } else if (scalingMode === "fit") {
                    scale = Math.min(canvas.width / image.width, canvas.height / image.height);
                    x = (canvas.width - image.width * scale) / 2;
                    y = (canvas.height - image.height * scale) / 2;
                    context.drawImage(image, x, y, image.width * scale, image.height * scale);
                } else if (scalingMode === "stretch") {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
                
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                worker.onmessage = event2 => {
                    const {width, height, buffer, newColorIDs} = event2.data;
                    const clamped = new Uint8ClampedArray(buffer);
                    const imageData = new ImageData(clamped, width, height);

                    context.putImageData(imageData, 0, 0);
                    setColorIDs(newColorIDs);
                    setPreviewDone(true);
                };
                worker.postMessage({imageData, colorPalette, dithering});
            };

            image.src = event.target.result;
        };

        reader.readAsDataURL(imageFile);

        return () => worker.terminate();
    }, [imageFile, colorPalette, mapSize, scalingMode, dithering]);


    const onFileUpload = event => {
        const file = event.target.files[0];
        if (!file) return;
        setImageFile(file);
    }


    const onDownload = async () => {
        let colorIDsGrid = [];
        for (let i = 0; i < mapSize.width * 128 * mapSize.height * 128; i += mapSize.width * 128) {
            colorIDsGrid.push(colorIDs.slice(i, i + mapSize.width * 128));
        }

        let mapColorIDs = [];
        for (let j = 0; j < mapSize.height * 128; j += 128) {
            for (let i = 0; i < mapSize.width * 128; i += 128) {
                let currentMapColorIDs = [];
                
                for (let y = j; y < j + 128; y++) {
                    for (let x = i; x < i + 128; x++) {
                        currentMapColorIDs.push(colorIDsGrid[y][x]);
                    }
                }

                mapColorIDs.push(currentMapColorIDs);
            }
        }

        let nbtData = {
            data: {
                dimension: "minecraft:overworld",
                trackingPosition: new Byte(0),
                locked: new Byte(1),
                xCenter: new Int(0),
                zCenter: new Int(0),
            },
            DataVersion: new Int(2566),
        };
        if (minecraftVersion === 1139) {
            nbtData = {
                data: {
                    dimension: new Byte(-128),
                    trackingPosition: new Byte(0),
                    locked: new Byte(1),
                    scale: new Byte(0),
                    width: new Short(128),
                    height: new Short(128),
                    xCenter: new Int(0),
                    zCenter: new Int(0),
                },
                DataVersion: new Int(1343),
            };
        } else if (minecraftVersion === 2225) {
            nbtData = {
                data: {
                    dimension: new Byte(0),
                    trackingPosition: new Byte(0),
                    locked: new Byte(1),
                    xCenter: new Int(0),
                    zCenter: new Int(0),
                },
                DataVersion: new Int(1952),
            };
        }

        let blob;
        const link = document.createElement("a");

        if (mapSize.width * mapSize.height === 1) {
            nbtData.data.colors = Buffer.from(mapColorIDs[0]);
            const buffer = encode("root", nbtData);
            blob = new Blob([gzip(buffer)], {type: "application/gzip"});
            link.download = `map_${startingMapID}.dat`;
        } else {
            const zip = new JSZip();

            for (let i = 0; i < mapColorIDs.length; i++) {
                let currentNbtData = {...nbtData};
                currentNbtData.data.colors = Buffer.from(mapColorIDs[i]);

                const buffer = encode("root", currentNbtData);
                zip.file(`map_${startingMapID + i}.dat`, gzip(buffer));
            }

            blob = await zip.generateAsync({type: "blob"});
            link.download = "maps.zip";
        }

        const url = URL.createObjectURL(blob);
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }


    return (
        <div id="image-view">
            <input type="file" id="image-input" accept="image/*" onChange={onFileUpload} />
            {imageFile ? <div id="canvas-container">
                <canvas id="image-canvas" ref={canvasRef} style={previewDone ? {} : {display: "none"}}></canvas>
                {(showGrid && previewDone) ? <div id="image-grid" style={{"--width": mapSize.width}}>
                    {Array.from({length: mapSize.width * mapSize.height}).map(index => <div key={index}></div>)}
                </div> : null}
            </div> : null}
            {(imageFile && !previewDone) ? <div id="generating-preview" style={{"--aspect-ratio": mapSize.width / mapSize.height}}>
                <div className="loading"></div>
            </div> : null}
            {imageFile ? <div className="icons">
                <label htmlFor="image-input" className="icon upload" title="Upload another image"><UploadIcon></UploadIcon></label>
                <button className="icon download" title={(mapSize.width * mapSize.height === 1) ? `Download map_${startingMapID}.dat` : "Download ZIP"}
                        onClick={onDownload} disabled={!previewDone}><DownloadIcon></DownloadIcon></button>
            </div> : null}
            {!imageFile ? <label htmlFor="image-input" className="initial-upload">
                <UploadIcon></UploadIcon>
                <div className="text">Upload image</div>
            </label> : null}
        </div>
    );
    
}
