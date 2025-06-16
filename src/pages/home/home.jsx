import {useEffect} from "react";
import ConvertSection from "./convert_section/convert_section";
import ParseSection from "./parse_section/parse_section";

import "./home.css";


export default function HomePage({}) {

    useEffect(() => {
        document.title = `Mapart.fun - The Best Online Tool for Working with Minecraft Maps`;
    }, []);


    return (
        <div id="home-page">
            <header id="header">
                <img src="/logo.png" />
                <div className="title">Mapart.fun</div>
            </header>
            <ConvertSection />
            <ParseSection />
            <footer id="footer">
                <div className="info">Mapart.fun • 2025 • v1.0.1</div>
            </footer>
        </div>
    );

}
