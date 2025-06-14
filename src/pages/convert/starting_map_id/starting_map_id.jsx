import {useState, useEffect} from "react";
import NumberInput from "../../../components/number_input";

import "./starting_map_id.css";


export default function StartingMapID({mapSize, startingMapID, setStartingMapID}) {

    const [mapsN, setMapsN] = useState(mapSize.width * mapSize.height);


    useEffect(() => {
        setMapsN(mapSize.width * mapSize.height);
    }, [mapSize]);


    return (
        <section id="starting-map-id">
            <div className="section-title">Map ID{(mapsN > 1) ? " range" : ""}</div>
            <div className="input-wrapper">
                <NumberInput value={startingMapID} setValue={v => setStartingMapID(v)} minValue={0} maxValue={32768 - mapsN} defaultValue={0} />
                {(mapsN > 1) ? <div className="last-map-id">- {startingMapID + mapsN - 1}</div> : null}
            </div>
        </section>
    );

}
