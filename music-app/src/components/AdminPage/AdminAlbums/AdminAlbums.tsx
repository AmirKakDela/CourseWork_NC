import React, {useEffect, useState} from "react";
import {AlbumType, SongType} from "../../../config/types";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Popconfirm, Skeleton} from "antd";
import AlbumCard from "../../AlbumCard/AlbumCard";
import AlbumAPI from "../../../API/AlbumAPI";
import './AdminAlbums.scss'

const AdminAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<AlbumType<SongType>[]>([
        {
            _id: "", name: "", artist: "", songs: [], cover: ""
        }
    ]);
    // const [songs, setSongs] = useState<SongType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const deleteAlbum = (id: string) => {
        AlbumAPI.deleteAlbum(id).then(() => {
            const resultAlbums = albums.filter(album => {
                return album._id !== id;
            });
            setAlbums(resultAlbums);
        });
    };

    useEffect(() => {
        AlbumAPI.getAllAlbumsWithSongs().then(data => {
            setAlbums(data);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? <Skeleton active/> :
                <>
                    <Link to="/admin/album/create">
                        <button className="form__button admin__button">Создать новый альбом</button>
                    </Link>
                    {albums && albums.map((album) => {
                        return <div className="admin-song__wrap admin-album__wrap" key={album._id}>
                            <AlbumCard album={album}/>
                            <div className="songs-container">
                                <h3 className="song__name">Список песен: </h3>
                                <div className="admin-album__wrap song-list">
                                    {album.songs.map((song, index) =>
                                        <h4 className="song__name _item">{index + 1}. {song.name}</h4>
                                    )}
                                </div>
                            </div>
                            <div className="group-form__button">
                                <Popconfirm
                                    title="Вы действительно хотите удалить данный альбом?"
                                    onConfirm={() => deleteAlbum(album._id)}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <button className="form__button admin-song__action admin-album__action">
                                        <DeleteOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }}/>
                                    </button>
                                </Popconfirm>
                                <Link to={`/admin/album/${album._id}`}>
                                    <button className="form__button admin-song__action admin-album__action">
                                        <EditOutlined style={{ fontSize: 20, color: "white", cursor: "pointer" }}/>
                                    </button>
                                </Link>
                            </div>
                        </div>;
                    })}
                </>
            }
        </>
    );
};

export default AdminAlbums;
