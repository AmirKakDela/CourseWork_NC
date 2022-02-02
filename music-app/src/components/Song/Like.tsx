import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/Reducers/rootReducer";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {thunkToggleLikeSong} from "../../redux/Actions/thunkUserActions";
import {Track} from "../../config/types";
import {ClipLoader} from "react-spinners";

type PropsType = {
    song: Track;
}

const Like: React.FC<PropsType> = (props) => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const likeLoading = useSelector((state: RootState) => state.user.likeLoading)
    const dispatch = useDispatch();

    const toggleLike = () => {
        dispatch(thunkToggleLikeSong(props.song));
    }
    const likeStatus = user.likedSongs.find(song => song._id === props.song._id)

    return (
        <div>
            {likeLoading
                ? <ClipLoader color='white' css={'display: block; font-size: 10px'}/>
                : user && likeStatus
                    ? <HeartFilled style={{fontSize: '20px', color: "#1db954"}} onClick={toggleLike}/>
                    : <HeartOutlined style={{fontSize: '20px', color: "white"}} onClick={toggleLike}/>
            }
        </div>
    );
};

export default Like;
