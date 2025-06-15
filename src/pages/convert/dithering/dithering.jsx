import {useEffect} from "react";

import "./dithering.css";


export default function Dithering({dithering, setDithering}) {

    const options = [
        "none",
        "Floyd-Steinberg",
    ];


    useEffect(() => {
        setDithering(options[0]);
    }, []);


    const getClassName = option => `option card${(dithering === option) ? " active" : ""}`


    const createOption = option => {
        return (
            <div className={getClassName(option)} key={option} onClick={() => setDithering(option)}>
                <div className="name">{option}</div>
            </div>
        );
    }


    return (
        <section id="dithering">
            <div className="section-title">Dithering</div>
            <div className="options">
                {options.map(version => createOption(version))}
            </div>
        </section>
    );

}
