import React, {useCallback, useEffect, useState} from "react";
import {PlaylistType} from "../../../config/types";
import PlaylistApi from "../../../API/PlaylistAPI";
import {Button, Popconfirm, Skeleton} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import PlaylistCard from "../../PlaylistCard/PlaylistCard";
import "./AdminPlaylists.scss"

const AdminPlaylists: React.FC = () => {
    //const dispatch = useDispatch()
    const [playlists, setPlaylists] = useState<PlaylistType[]>([])
    const [isLoading, setIsLoading] = useState(true);


    const deletePlaylist = useCallback((id: string) => {
        PlaylistApi.deletePlaylist(id)
            .then(() => {
                setPlaylists(playlists.filter(playlist => playlist._id !== id));
            })
        //dispatch(thunkUserPlaylists())
    }, [playlists])

    useEffect(() => {
        PlaylistApi.getAllPlaylists().then(data => {
            setPlaylists(data.playlists)
            setIsLoading(false)
        })
    }, [])
    return (
        <div className="admin_playlists">
            {isLoading ? <Skeleton active/> :
                playlists && playlists.map((playlist, index) => {
                    return <div className="admin_playlist__wrap">
                        <PlaylistCard playlist={playlist}/>
                        <div className="admin_playlist__delete">
                            <Popconfirm
                                title="Вы действительно хотите удалить данный плейлист?"
                                onConfirm={() => deletePlaylist(playlist._id)}
                                okText="Да"
                                cancelText="Нет"
                            >
                                <Button className="admin_playlist__button" icon={<DeleteOutlined/>}/>
                            </Popconfirm>
                        </div>
                    </div>
                })}
        </div>
    )
}

export default AdminPlaylists