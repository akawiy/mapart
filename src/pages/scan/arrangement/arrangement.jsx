import { useEffect, useState } from "react";
import NumberInput from "../../../components/number_input";

import "./arrangement.css";


export default function Arrangement({mapSize, arrangement, setArrangement}) {

    const [prevMapSize, setPrevMapSize] = useState({width: 0, height: 0});


    const setGridValue = (x, y, v) => {
        let newArrangement = arrangement.map(i => i.map(j => j));

        newArrangement[y][x] = v;

        setArrangement(newArrangement);
    }


    useEffect(() => {
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
                            insertDefaultValue={false} />
    }


    return <section id="arrangement">
        <div className="section-title">Arrangement</div>
        <div className="grid" style={{"--width": mapSize.width, "--height": mapSize.height}}>
            {Array.from({length: mapSize.width * mapSize.height}).map((_, i) => getCell(i))}
        </div>
    </section>

}
