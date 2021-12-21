import {useState} from "react";
import "./Player.scss"

export function Player(props: any){
    const [,setPlay] = useState<boolean>(false);
    const playMusic = () => {
        setPlay(it => !it);
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
