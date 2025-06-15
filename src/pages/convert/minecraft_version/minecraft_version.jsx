import {useEffect} from "react";

import "./minecraft_version.css";


export default function MinecraftVersion({minecraftVersion, setMinecraftVersion}) {

    const options = {
        1139: "1.12.x - 1.14.x",
        2225: "1.15.x",
        2566: "1.16.x",
        2724: "1.17.x - 1.21.x",
    };


    useEffect(() => {
        setMinecraftVersion(+Object.keys(options)[Object.keys(options).length - 1]);
    }, []);


    const getClassName = version => `option card${(minecraftVersion === version) ? " active" : ""}`


    const createOption = version => {
        const items = options[version].split(" - ");

        if (items.length === 1) {
            return (
                <div className={getClassName(version)} key={version} onClick={() => setMinecraftVersion(version)}>
                    <div className="version">{items[0]}</div>
                </div>
            );
        } else if (items.length == 2) {
            return (
                <div className={getClassName(version)} key={version} onClick={() => setMinecraftVersion(version)}>
                    <div className="version from">{items[0]}</div>
                    <div className="sep">-</div>
                    <div className="version to">{items[1]}</div>
                </div>
            );
        }
    }


    return (
        <section id="minecraft-version">
            <div className="section-title">Minecraft version</div>
            <div className="options">
                {Object.keys(options).map(version => createOption(+version))}
            </div>
        </section>
    );

}
