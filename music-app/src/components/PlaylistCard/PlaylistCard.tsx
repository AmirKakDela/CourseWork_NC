import React from 'react';
import '../AlbumCard/albumCard.scss';

const defaultImageUrl = "https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg";

function PlaylistCard ({ playlist, onPlaylistClick }: any){
    return (
        <div className="playlist" onClick={() => onPlaylistClick(playlist._id)}>
            <img src={playlist.cover || defaultImageUrl} alt="cover"
                 className="playlist__img"/>
            <h2 className="playlist__name">
                {playlist.name}
            </h2>
            <h3 className="playlist__description">
                {playlist.description}
            </h3>
        </div>
    );
}

export default PlaylistCard;
