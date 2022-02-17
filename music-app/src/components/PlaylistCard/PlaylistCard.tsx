import {CaretRightOutlined} from "@ant-design/icons";
import {Button} from "antd";
import React from "react";
import "./PlaylistCard.scss";
import {Link} from "react-router-dom";
import {PlaylistType} from "../../config/types";

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";


function PlaylistCard(props: any) {
    return (
        <Link to={`/playlist/${props.playlist._id}`}>
            <div className="album">
                <img src={props.playlist.cover || defaultImageUrl} alt="cover"
                     className="album__img"/>
                <h2 className="album__name">
                    {props.playlist.name}
                </h2>
                <h3 className="album__artist">
                    {props.playlist.user.name}
                </h3>
                <Button shape="circle" icon={<CaretRightOutlined/>} className="album__btn"/>
            </div>
        </Link>
    );
}

export default PlaylistCard;
