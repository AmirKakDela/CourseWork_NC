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
            <button className="album__btn">
                <svg height="16" role="img" width="16" viewBox="0 -3 24 24" aria-hidden="true">
                    <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"/>
                </svg>
            </button>
        </div>
    );
}

export default AlbumCard;
