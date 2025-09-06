import {Link} from "react-router";
import RightArrowIcon from "../../../components/icons/right_arrow";

import "./scan_section.css";
import "../../../components/theme_button.css";


export default function ScanSection({}) {
    
    return (
        <section id="scan" fetchPriority="high">
            <div className="left">
                <div className="image" aria-label="Minecraft high-quality city map"></div>
                <div className="content">
                    <div className="message">Get perfect<br />high-resolution<br />scans of your<br />world maps</div>
                    <Link to="/scan">
                        <button className="theme-button try-it-out">Scan <RightArrowIcon /></button>
                    </Link>
                    <div className="new">New!</div>
                </div>
            </div>
        </section>
    );

}
