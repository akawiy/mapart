import {useEffect} from "react";
import ConvertSection from "./convert_section/convert_section";
import ParseSection from "./parse_section/parse_section";
import logo from "../../assets/logo.png";

import "./home.css";


export default function HomePage({}) {

    useEffect(() => {
        document.title = `Mapart.me - The Best Online Tool for Working with Minecraft Maps`;
    }, []);


    return (
        <div id="home-page">
            <header id="header">
                <img src={logo} />
                <div className="title">Mapart.me</div>
            </header>
            <ConvertSection />
            <ParseSection />
            <footer id="footer">
                <div className="info">2025 • v1.0.0</div>
            </footer>
        </div>
    );

}
