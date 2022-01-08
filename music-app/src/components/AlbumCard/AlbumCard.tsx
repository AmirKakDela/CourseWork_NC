import { CaretRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import "./albumCard.scss";

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";

function AlbumCard({ album, onAlbumClick }: any) {
    return (
        <div className="album" onClick={() => onAlbumClick(album._id)}>
            <img src={album.cover || defaultImageUrl} alt="cover"
                 className="album__img"/>
            <h2 className="album__name">
                {album.name}
            </h2>
            <h3 className="album__artist">
                {album.artist}
            </h3>
            <Button shape="circle" icon={<CaretRightOutlined />} className="album__btn"/>
        </div>
    );
}

export default AlbumCard;
