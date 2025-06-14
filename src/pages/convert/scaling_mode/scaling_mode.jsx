import {useEffect} from "react";
import cropImage from "../../../assets/scaling_modes/crop.png";
import fitImage from "../../../assets/scaling_modes/fit.png";
import stretchImage from "../../../assets/scaling_modes/stretch.png";

import "./scaling_mode.css";


export default function ScalingMode({imageFileSize, scalingMode, setScalingMode}) {

    const options = [
        "crop",
        "fit",
        "stretch",
    ];
    const images = {
        crop: cropImage,
        fit: fitImage,
        stretch: stretchImage,
    };

    useEffect(() => {
        setScalingMode(options[0]);
    }, []);


    const getClassName = mode => `option card${(scalingMode === mode) ? " active" : ""}`


    const createOption = mode => {
        return (
            <div className={getClassName(mode)} key={mode} onClick={() => setScalingMode(mode)}>
                <img src={images[mode]} alt="" style={(imageFileSize.width / imageFileSize.height < 1) ? {transform: "rotate(90deg)"} : {}} />
                <div className="name">{mode}</div>
            </div>
        );
    }


    return (
        <section id="scaling-mode">
            <div className="section-title">Scaling mode</div>
            <div className="options">
                {options.map(version => createOption(version))}
            </div>
        </section>
    );

}
