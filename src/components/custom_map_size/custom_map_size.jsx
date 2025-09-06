import NumberInput from "../number_input";

import "./custom_map_size.css";


export default function CustomMapSize({mapSize, setMapSize}) {

    return <div className="custom-map-size">
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
    </div>;

}
