// import {Link} from "react-router";
// import RightArrowIcon from "../../../components/icons/right_arrow";

import "./parse_section.css";
import "../../../components/theme_button.css";


export default function ParseSection({}) {
    
    return (
        <section id="parse">
            <div className="left">
                <div className="content">
                    <div className="message">Get perfect<br />high-resolution<br />scans of your<br />world maps</div>
                    {/* <Link to="/parse" target="_blank"> */}
                        <button disabled className="theme-button try-it-out disabled">Coming soon</button>
                    {/* </Link> */}
                </div>
            </div>
        </section>
    );

}
