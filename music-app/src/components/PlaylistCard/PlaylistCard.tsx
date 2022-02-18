import React from "react";
import {CaretRightOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {Button} from "antd";

import "./PlaylistCard.scss";
import {formWordTrack} from "../../utils/declension.utils";


const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";


function PlaylistCard(props: any) {
    const location = useLocation()

    if (location.pathname === "/admin/playlists") {

        return (
            <Link to={`/admin/playlist/${props.playlist._id}`}>
                <div className="playlist__card">
                    <img src={props.playlist.cover || defaultImageUrl} alt="cover"
                         className="card__img"/>
                    <h2 className="card__name">
                        {props.playlist.name}
                    </h2>
                    <h3 className="card__artist">
                        {props.playlist.user.name}
                    </h3>
                    <span className="card__tracks">{props.playlist.songs.length} {formWordTrack(props.playlist.songs.length)}</span>
                </div>
            </Link>
        )
    }

    return (
        <Link to={`/playlist/${props.playlist._id}`}>
            <div className="playlist__card">
                <img src={props.playlist.cover || defaultImageUrl} alt="cover"
                     className="card__img"/>
                <h2 className="card__name">
                    {props.playlist.name}
                </h2>
                <h3 className="card__artist">
                    {props.playlist.user.name}
                </h3>
                <span className="card__tracks">{props.playlist.songs.length} {formWordTrack(props.playlist.songs.length)}</span>
                <Button shape="circle" icon={<CaretRightOutlined/>} className="card__btn"/>
            </div>
        </Link>
    );
}

export default PlaylistCard;
