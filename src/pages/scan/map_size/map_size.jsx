import {useState, useEffect} from "react";
import ToggleGridButton from "../../../components/toggle_grid_button/toggle_grid_button";
import CustomMapSize from "../../../components/custom_map_size/custom_map_size";

import "./map_size.css";


export default function MapSize({mapSize, setMapSize, showGrid, setShowGrid}) {

    return (
        <section id="map-size">
            <div className="section-title">Map size</div>
            <CustomMapSize {...{mapSize}} setMapSize={v => setMapSize(v)} />
            <ToggleGridButton {...{showGrid}} setShowGrid={v => setShowGrid(v)} />
        </section>
    );

}
