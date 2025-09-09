import Logo from "../../components/icons/logo";

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
        <div className="info">
            &copy; {yearRange} <span>
                <Logo />
                <span className="website-name">Mapart.fun</span>
            </span> v1.3.1 by <a href="https://plschq.com" target="_blank">
                <img src="https://www.plschq.com/favicon.svg" alt="" />
                <span className="author-name">Vladimir Polischuk</span>
            </a>
        </div>
        <div className="sep"></div>
        <div className="privacy">This website does not collect or store any personal information. All actions are performed directly in your browser, and any files you upload are never sent to an external server.</div>
        <div className="sep"></div>
        <div className="bugs">For questions, feedback, or bug reports, please contact <a href="mailto:vladimirp.main@gmail.com">vladimirp.main@gmail.com</a></div>
    </footer>

}
