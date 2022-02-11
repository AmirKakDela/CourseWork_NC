import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/Reducers/rootReducer";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {thunkToggleLikeSong} from "../../redux/Actions/thunkUserActions";
import {SongType} from "../../config/types";
import {ClipLoader} from "react-spinners";

type PropsType = {
    song: SongType;
}

const Like: React.FC<PropsType> = (props) => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const likeLoading = useSelector((state: RootState) => state.user.currentUser.likeLoading)
    const dispatch = useDispatch();

    const toggleLike = () => {
        dispatch(thunkToggleLikeSong(props.song));
    }
    const likeStatus = user.likedSongs.find(song => song._id === props.song._id)

    return (
        <div>
            {likeLoading.status && likeLoading.songId === props.song._id
                ? <ClipLoader color='white' css={'display: block; width: 18px; height: 18px'}/>
                : user && likeStatus
                    ? <HeartFilled style={{fontSize: '20px', color: "#1db954", marginLeft: 10}} onClick={toggleLike}/>
                    : <HeartOutlined style={{fontSize: '20px', color: "white", marginLeft: 10}} onClick={toggleLike}/>
            }
        </div>
    );
};

export default Like;
