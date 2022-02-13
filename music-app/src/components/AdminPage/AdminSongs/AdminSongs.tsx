import React, {useEffect, useState} from 'react';
import SongsAPI from "../../../API/SongsAPI";
import {SongType} from "../../../config/types";
import {Song} from "../../Song/Song";
import './adminSongs.scss';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Popconfirm, Skeleton} from "antd";

const AdminSongs: React.FC = () => {
    const [songs, setSongs] = useState<SongType[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const deleteSong = (id: string) => {
        SongsAPI.deleteSong(id).then(() => {
            const newSongs = songs.filter(song => {
                return song._id !== id
            })
            setSongs(newSongs);
        })
    }

    useEffect(() => {
        SongsAPI.getAllSongs().then(data => {
            setSongs(data)
            setIsLoading(false
            )
        })
    }, [])


    return (
        <>
            {isLoading ? <Skeleton active/> :
                <>
                    <Link to="/admin/song/create">
                        <button className="form__button admin__button">Создать новую песню</button>
                    </Link>
                    {songs && songs.map((song, index) => {
                        return <div className="admin-song__wrap" key={song._id}>
                            <Song song={song} order={index + 1}/>
                            <Popconfirm
                                title="Вы действительно хотите удалить данную песню?"
                                onConfirm={() => deleteSong(song._id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                       <button className="form__button admin-song__action">
                        <DeleteOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                    </button>
                            </Popconfirm>

                            <button className="form__button admin-song__action">
                        <Link to={`/admin/song/${song._id}`}>
                            <EditOutlined style={{fontSize: 20, color: 'white', cursor: "pointer"}}/>
                        </Link>
                    </button>
                        </div>
                    })}
                </>
            }
        </>
    );
};

export default AdminSongs;
