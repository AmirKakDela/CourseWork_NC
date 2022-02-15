import {CaretRightOutlined} from "@ant-design/icons";
import {Button, MenuTheme} from "antd";
import React from "react";
import "./albumCard.scss";
import {Link} from "react-router-dom";
import {AlbumType} from "../../config/types";
import {ThemeContext} from "../Layout/theme-context/constants";

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";
type PropsType = {
    album: AlbumType;
}

const AlbumCard: React.FC<PropsType> = ({ album }) => {
    return (
        <Link to={`/album/${album._id}`}>
            <ThemeContext.Consumer>{(theme: MenuTheme | undefined) => (
                <div className={`album _${theme}`}>
                    <img src={album.cover || defaultImageUrl} alt="cover"
                         className={`album__img _${theme}`}/>
                    <h2 className={`album__name _${theme}`}>
                        {album.name}
                    </h2>
                    <h3 className={`album__artist _${theme}`}>
                        {album.artist}
                    </h3>
                    <Button shape="circle" icon={<CaretRightOutlined/>} className="album__btn"/>
                </div>
            )}
            </ThemeContext.Consumer>
        </Link>
    );
};

export default AlbumCard;
