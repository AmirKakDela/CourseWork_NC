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
                songs && songs.map((song, index) => {
                    return <div className="admin-song__wrap">
                        <Song key={song._id} song={song} order={index + 1}/>
                        <Popconfirm
                            title="Вы действительно хотите удалить данную песню?"
                            onConfirm={() => deleteSong(song._id)}
                            okText="Да"
                            cancelText="Нет"
                        >
                       <span className="admin-song__action">
                        <DeleteOutlined style={{fontSize: 25, color: 'white', cursor: "pointer"}}/>
                    </span>
                        </Popconfirm>

                        <span className="admin-song__action">
                        <Link to={`/admin/song/${song._id}`}>
                            <EditOutlined style={{fontSize: 25, color: 'white', cursor: "pointer"}}/>
                        </Link>
                    </span>
                    </div>
                })}
        </>
    );
};

export default AdminSongs;
