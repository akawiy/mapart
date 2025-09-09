import { useEffect, useState } from "react";
import NumberInput from "../../../components/number_input";
import UploadIcon from "../../../components/icons/upload";
import DownloadIcon from "../../../components/icons/download";

import "./arrangement.css";


export default function Arrangement({mapSize, setMapSize, arrangement, setArrangement}) {

    const [pendingArrangement, setPendingArrangement] = useState(null);


    const setGridValue = (x, y, v) => {
        let newArrangement = arrangement.map(i => i.map(j => j));

        newArrangement[y][x] = v;

        setArrangement(newArrangement);
    }


    useEffect(() => {
        if (pendingArrangement) {
            setArrangement(pendingArrangement);
            setPendingArrangement(null);
            return;
        }

        let newArrangement = [];
        let c = 0;
 
        for (let i = 0; i < mapSize.height; i++) {
            let row = [];

            for (let j = 0; j < mapSize.width; j++) {
                row.push(c);
                c++;  // lol c++
            }

            newArrangement.push(row);
        }

        setArrangement(newArrangement);
    }, [mapSize]);


    const getCell = i => {
        if (mapSize.height > arrangement.length || (arrangement.length !== 0 && arrangement[0].length < mapSize.width)) return;
        if (mapSize.width === 0 || mapSize.height === 0) return;

        let x = i % mapSize.width;
        let y = Math.floor(i / mapSize.width);

        return <NumberInput minValue={0}
                            maxValue={32767}
                            defaultValue={i}
                            key={i}
                            value={arrangement[y][x]}
                            setValue={v => setGridValue(x, y, v)}
                            insertDefaultValue={true} />
    }


    const upload = event => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            let content = e.target.result.replaceAll("\r", "");
            let grid = [];
            
            for (let i of content.split("\n\n")) {
                grid.push([]);

                for (let j of i.split("\n")) {
                    if (!j) continue;

                    if (isNaN(j) || +j < 0 || +j >= 32768 || +j !== Math.floor(+j)) {
                        alert("Couldn't parse map arrangements from uploaded TXT file");
                        return;
                    }

                    grid[grid.length - 1].push(+j);
                }
            }

            const mapWidth = grid[0].length;
            const mapHeight = grid.length;
            for (let i of grid) {
                if (i.length !== mapWidth) {
                    alert("Couldn't parse map arrangements from uploaded TXT file");
                    return;
                }
            }

            setPendingArrangement(grid);
            setMapSize({width: mapWidth, height: mapHeight});
        };
        reader.readAsText(file);
    }


    const download = () => {
        let rows = [];
        for (let j = 0; j < mapSize.height; j++) {
            let row = [];

            for (let i = 0; i < mapSize.width; i++) {
                row.push(arrangement[j][i]);
            }

            rows.push(row.join("\n"));
        }
        const text = rows.join("\n\n") + "\n";

        const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "maps_arrangement.txt";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }


    return <section id="arrangement">
        <input type="file" id="arrangement-input" accept=".txt" onChange={upload} />
        <div className="section-title">Arrangement</div>
        <div className="grid" style={{"--width": mapSize.width, "--height": mapSize.height}}>
            {Array.from({length: mapSize.width * mapSize.height}).map((_, i) => getCell(i))}
        </div>
        <div className="buttons">
            <label htmlFor="arrangement-input" className="button upload" title="Upload maps arrangement"><UploadIcon></UploadIcon></label>
            <button className="button download" title="Download maps_arrangement.txt" onClick={download}><DownloadIcon></DownloadIcon></button>
        </div>
    </section>

}
