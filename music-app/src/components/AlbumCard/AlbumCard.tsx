import {CaretRightOutlined} from "@ant-design/icons";
import {Button, MenuTheme} from "antd";
import React from "react";
import "./albumCard.scss";
import {Link} from "react-router-dom";
import {AlbumType} from "../../config/types";

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";
type PropsType = {
    album: AlbumType;
}

const AlbumCard: React.FC<PropsType> = ({ album }) => {
    return (
        <Link to={`/album/${album._id}`}>
                <div className="album">
                    <img src={album.cover || defaultImageUrl} alt="cover"
                         className="album__img"/>
                    <h2 className="album__name">
                        {album.name}
                    </h2>
                    <h3 className="album__artist">
                        {album.artist}
                    </h3>
                    <Button shape="circle" icon={<CaretRightOutlined/>} className="album__btn"/>
                </div>
        </Link>
    );
};

export default AlbumCard;
