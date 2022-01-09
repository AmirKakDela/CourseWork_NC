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
            <div className="t">
                <input
                    type="range"
                    min={begin}
                    max={end}
                    value={begin}
                    onChange={onChange}
                />
                <div>{begin}/{end}</div>
            </div>
        );
    };

export default SongProgress;
