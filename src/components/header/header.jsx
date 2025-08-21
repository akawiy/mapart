import {Link, useLocation} from "react-router";

import "./header.css";


export default function Header({}) {

    const location = useLocation();
    const nav = {
        "/": "home",
        "/convert": "convert",
        // "/scan": "scan",
        // "/about": "about",
    };


    return <header id="header">
        <div className="left">
            <img src="/logo.png" />
            <div className="title">Mapart.fun</div>
        </div>
        <nav id="nav">
            {Object.keys(nav).map(route => <Link to={route} key={route} className={location.pathname === route ? "active" : ""}>{nav[route]}</Link>)}
        </nav>
    </header>

}
