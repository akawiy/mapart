import {useEffect} from "react";
import Footer from "../../components/footer/footer";

import "./privacy_policy.css";


export default function PrivacyPolicyPage({}) {

    useEffect(() => {
        document.title = `Privacy Policy - Mapart.fun`;
    }, []);


    return (
        <div id="privacy-policy-page">
            <div className="title">We Care About Your Privacy</div>
            <div className="text">
                This website does not send files you upload or parameters you choose
                to any server, all actions are performed directly in your browser. We use
                Vercel Analytics library, which collects only essential
                data that is needed to improve the website's performance and SEO:<br />
                - Pages you visit (on this website only)<br />
                - Your browser<br />
                - Your country<br />
                - Your device<br />
                - Your operating system<br />
                The website's <a href="https://github.com/akawiy/mapart" target="_blank" rel="noopener noreferrer">
                    source code
                </a> is open for anyone to confirm these statements.
                If you have any questions about the data we collect,
                please <a href="https://akawiy.com/contact" target="_blank">contact the developer</a>.
            </div>
            <Footer />
        </div>
    );

}
