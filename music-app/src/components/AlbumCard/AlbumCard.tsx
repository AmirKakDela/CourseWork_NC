import {Button} from "antd";
import React, {MouseEventHandler, MouseEvent} from "react";
import "./albumCard.scss";
import {Link, useLocation} from "react-router-dom";
import {AlbumType} from "../../config/types";
import {CaretRightFilled as PlayIcon, PauseOutlined as PauseIcon} from "@ant-design/icons/lib/icons/index";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {PlayerReducerState} from "../../redux/Reducers/playerReducer";
import {RootState} from "../../redux/Reducers/rootReducer";

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";
type PropsType = {
    album: AlbumType,
    onClickPlayIcon: () => void
}

const AlbumCard: React.FC<PropsType> = ({ album, onClickPlayIcon }) => {
    const location = useLocation();
    const { playSong, pauseSong } = useActions();
    const { pause, track } = useTypedSelector<PlayerReducerState>((state: RootState) => state.player);
    const isSelectedSong = track?._id && album?.songs?.some(it => it === track._id || (typeof it == "object" && it._id === track._id));
    const isPlayed = !pause && isSelectedSong;
    const icon = isPlayed ? <PauseIcon/> : <PlayIcon/>;
    let linkToAlbumPage = location.pathname === "/admin/albums" ? `/admin/album/${album._id}` : `/album/${album._id}`;

    const onSwitchPlay: MouseEventHandler<HTMLElement> = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onClickPlayIcon();
        if (isPlayed) {
            pauseSong();
        } else {
            playSong();
        }
    };

    return (
        <Link to={linkToAlbumPage}>
            <div className="album">
                <img src={album.cover || defaultImageUrl} alt="cover"
                     className="album__img"/>
                <h2 className="album__name">
                    {album.name}
                </h2>
                <h3 className="album__artist">
                    {album.artist}
                </h3>
                <Button
                    shape="circle"
                    icon={icon}
                    className="album__btn"
                    onClick={onSwitchPlay}
                />
            </div>
        </Link>
    );
};

export default AlbumCard;
