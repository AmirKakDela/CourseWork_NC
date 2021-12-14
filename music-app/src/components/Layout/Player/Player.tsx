import {useState} from "react";
import "./Player.css"

export function Player(props: any){

    const [play,setPlay] = useState<boolean>(false);

    const playMusic = () => {
        setPlay(!play);
    }


    return (
        <div className="player">
            <audio src={props.audio}/>
            <div onClick={playMusic} className={!setPlay ? "icon icon-play" : "icon icon-pause"} />
            <div id="timeline">
                <div id="handle" />
            </div>
        </div>
    )
}
