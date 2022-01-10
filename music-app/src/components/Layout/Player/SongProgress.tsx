import React from "react";
import { Slider } from 'antd';

type SongProgressProps = {
    begin: number,
    end: number,
    onChange: (e: any) => void
}

const SongProgress: React.FC<SongProgressProps> =
    ({
         begin, end, onChange
     }) => {
        return (
            <>
                <div>{begin}</div>
                <Slider className="player__control__song-progress"
                        trackStyle={{ color: '#b3b3b3', backgroundColor: '#535353', flex:'1'}}
                        handleStyle={{ display: "none" }}
                        min={0}
                        value={begin}
                        max={end}
                        tooltipVisible={false}
                        onChange={() => onChange}/>
                <div>{end}</div>
            </>
        );
    };

export default SongProgress;
