import {Link} from "react-router";
import RightArrowIcon from "../../../components/icons/right_arrow";
import chessboardMapart from "../../../assets/demo_maparts/chessboard.png";
import monaLisaMapart from "../../../assets/demo_maparts/mona_lisa.png";
import pointersMapart from "../../../assets/demo_maparts/pointers.png";

import "./convert_section.css";
import "../../../components/theme_button.css";


export default function ConvertSection({}) {

    return (
        <section id="convert">
            <div className="left">
                <div className="image" style={{backgroundImage: `url(${chessboardMapart})`}}></div>
                <div className="image" style={{backgroundImage: `url(${monaLisaMapart})`}}></div>
                <div className="image" style={{backgroundImage: `url(${pointersMapart})`}}></div>
            </div>
            <div className="right">
                <div className="message">Add images<br />into your<br />minecraft world<br />in vanilla</div>
                <Link to="/convert" target="_blank">
                    <button className="theme-button try-it-out">Try it out<RightArrowIcon /></button>
                </Link>
            </div>
        </section>
    );

}
