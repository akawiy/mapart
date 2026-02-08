import Logo from "../../components/icons/logo";
import {Link} from "react-router-dom";

import "./footer.css";


export default function Footer({}) {

    const startYear = 2025;
    const dash = "\u2013";
    const currentYear = new Date().getFullYear();
    
    let yearRange = `${startYear}`;
    if (currentYear > startYear) {
        yearRange += `${dash}${currentYear}`;
    }


    return <footer id="footer">
        <div className="copyright">
            &copy; {yearRange} <span>
                <Logo />
                <span className="website-name">Mapart</span>
            </span> v1.3.2 by <a href="https://akawiy.com" target="_blank">
                <img src="https://akawiy.com/favicon.svg" alt="Akawiy logo" />
                <span className="author-name">Akawiy</span>
            </a>
        </div>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/convert">Convert</Link>
            <Link to="/scan">Scan</Link>
            <Link to="/privacy">Privacy</Link>
            <a href="https://github.com/akawiy/mapart" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://akawiy.com/contact" target="_blank">Contact</a>
        </div>
    </footer>

}
