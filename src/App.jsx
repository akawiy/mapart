import {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./pages/home/home";
import ConvertPage from "./pages/convert/convert";
// import ParsePage from "./pages/parse/parse";

import "./App.css";


export default function App() {

    useEffect(() => {
        console.log("Hi there!");
    }, []);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/convert" element={<ConvertPage />} />
                {/* <Route path="/parse" element={<ParsePage />} /> */}
            </Routes>
        </BrowserRouter>
    );

}
