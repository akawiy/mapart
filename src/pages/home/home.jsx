import {useEffect} from "react";
import ConvertSection from "./convert_section/convert_section";
import ScanSection from "./scan_section/scan_section";

import "./home.css";


export default function HomePage({}) {

    useEffect(() => {
        document.title = `Mapart.fun - The Best Online Tool for Working with Minecraft Maps`;
    }, []);


    return (
        <div id="home-page">
            <ConvertSection />
            <ScanSection />
            <footer id="footer">
                <div className="info">&copy; 2025 Mapart.fun</div>
            </footer>
        </div>
    );

}
