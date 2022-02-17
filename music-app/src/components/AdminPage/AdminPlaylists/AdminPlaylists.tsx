import React, {useEffect, useState} from "react";
import {PlaylistType} from "../../../config/types";
import PlaylistApi from "../../../API/PlaylistAPI";
import {Popconfirm, Skeleton} from "antd";
import {Song} from "../../Song/Song";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const AdminPlaylists: React.FC = () => {
    const [playlists, setPlaylists] = useState<PlaylistType[]>([])
    const [isLoading, setIsLoading] = useState(true);

    const deletePlaylist = (id: string) => {
        PlaylistApi.deletePlaylist(id)
            .then(() => {
                setPlaylists(playlists.filter(playlist => playlist._id !== id));
            })
    }

    useEffect(() => {
        PlaylistApi.getAllPlaylists().then(data => {
            setPlaylists(data.playlists)
            setIsLoading(false)
        })
    }, [])
    return (
        <>
            {isLoading ? <Skeleton active/> :
                playlists && playlists.map((playlist, index) => {
                    return <div className="admin-song__wrap">
                        {playlist.name}
                        {/*<Song key={song._id} song={song} order={index + 1}/>
                        <Popconfirm
                            title="Вы действительно хотите удалить данную песню?"
                            onConfirm={() => deletePlaylist(playlist._id)}
                            okText="Да"
                            cancelText="Нет"
                        >
                        <span className="admin-song__action">
                        <DeleteOutlined style={{fontSize: 25, color: 'white', cursor: "pointer"}}/>
                        </span>
                                    </Popconfirm>

                                    <span className="admin-song__action">
                        <Link to={`/admin/song/${playlist._id}`}>
                        <EditOutlined style={{fontSize: 25, color: 'white', cursor: "pointer"}}/>
                        </Link>
                        </span>*/}
                    </div>
                })}
        </>
    )
}

export default AdminPlaylists