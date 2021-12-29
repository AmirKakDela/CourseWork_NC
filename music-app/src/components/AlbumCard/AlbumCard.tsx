import React from 'react';
import './albumCard.scss';

function AlbumCard ({ album, onAlbumClick }: any){
    return (
        <div className="album" onClick={onAlbumClick(album._id)}>
            <img src="https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg" alt="cover"
                 className="album__img"/>
            <h2 className="album__name">
                ОПГ Сити
                {/*{album.name}*/}
            </h2>
            <h3 className="album__artist">
                OG Buda
                {/*{album.artist}*/}
            </h3>
        </div>
    );
}

export default AlbumCard;
