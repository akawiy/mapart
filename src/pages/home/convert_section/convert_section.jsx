import {useState} from "react";
import {Link} from "react-router";
import RightArrowIcon from "../../../components/icons/right_arrow";
import chessboardMapart from "../../../assets/demo_maparts/chessboard.png";
import monaLisaMapart from "../../../assets/demo_maparts/mona_lisa.png";
import pointersMapart from "../../../assets/demo_maparts/pointers.png";

import "./convert_section.css";
import "../../../components/theme_button.css";


export default function ConvertSection({}) {

    const [activeImage, setActiveImage] = useState(1);


    return (
        <section id="convert">
            <div className="left">
                <button className={`image${activeImage === 0 ? " active" : ""}`} onMouseEnter={() => setActiveImage(0)} style={{backgroundImage: `url(${chessboardMapart})`}}></button>
                <button className={`image${activeImage === 1 ? " active" : ""}`} onMouseEnter={() => setActiveImage(1)} style={{backgroundImage: `url(${monaLisaMapart})`}}></button>
                <button className={`image${activeImage === 2 ? " active" : ""}`} onMouseEnter={() => setActiveImage(2)} style={{backgroundImage: `url(${pointersMapart})`}}></button>
            </div>
            <div className="right">
                <div className="message">Add images<br />into your<br />minecraft world<br />in vanilla</div>
                <Link to="/convert">
                    <button className="theme-button try-it-out">Convert<RightArrowIcon /></button>
                </Link>
            </div>
        </section>
    );

}
