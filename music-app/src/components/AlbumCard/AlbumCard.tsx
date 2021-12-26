import React from 'react';
import './albumCard.scss';

const AlbumCard: React.FC = () => {
    return (
        <div className="album">
            <img src="https://the-flow.ru/uploads/images/catalog/element/5de03395535b5.jpg" alt="cover"
                 className="album__img"/>
            <h2 className="album__name">
                ОПГ Сити
            </h2>
            <h3 className="album__artist">
                OG Buda
            </h3>
        </div>
    );
};

export default AlbumCard;
