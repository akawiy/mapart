import {Link} from "react-router";
import RightArrowIcon from "../../../components/icons/right_arrow";
import chessboardMapart from "../../../assets/demo_maparts/chessboard.webp";
import monaLisaMapart from "../../../assets/demo_maparts/mona_lisa.webp";
import pointersMapart from "../../../assets/demo_maparts/pointers.webp";

import "./convert_section.css";
import "../../../components/theme_button.css";


export default function ConvertSection({}) {

    return (
        <section id="convert">
            <div className="left">
                <button aria-label="Minecraft chessboard map art" className={`image`} style={{backgroundImage: `url(${chessboardMapart})`, transform: "rotateY(30deg)"}}></button>
                <button aria-label="Minecraft Mona Lisa map art" className={`image active`} style={{backgroundImage: `url(${monaLisaMapart})`, zIndex: 50}}></button>
                <button aria-label="Minecraft street pointers map art" className={`image`} style={{backgroundImage: `url(${pointersMapart})`, transform: "rotateY(-30deg)"}}></button>
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
