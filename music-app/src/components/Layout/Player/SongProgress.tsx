import React from "react";
import {Slider} from "antd";

type SongProgressProps = {
    begin: number,
    end: number,
    onChange: (e: any) => void,
    current?: string,
    finish?: string
}

const SongProgress = ({ begin, end, onChange, current, finish }: SongProgressProps) => {
    return (
        <div className="song-progress">
            <div>{current || begin}</div>
            <Slider className="song-progress__slider"
                    trackStyle={{ color: "#b3b3b3", backgroundColor: "#535353", flex: "1" }}
                    handleStyle={{ display: "none" }}
                    min={0}
                    value={begin}
                    max={end}
                    tooltipVisible={false}
                    onChange={onChange}/>
            <div>{finish || end}</div>
        </div>
    );
};

export default SongProgress;
