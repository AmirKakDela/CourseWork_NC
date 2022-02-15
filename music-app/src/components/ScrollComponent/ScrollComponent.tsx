import React from "react";
import {ThemeContext} from "../Layout/theme-context/constants";
import "./ScrollComponent.scss";
import {MenuTheme} from "antd";

export function ScrollComponent(props: any) {
    return (
        <ThemeContext.Consumer>{(theme: MenuTheme | undefined) => (
        <div className={`collections _${theme}`} >
            <div className={`collections__title _${theme}`}>
                <h2 className={`collections__title__name _${theme}`}>{props.titleName}</h2>
            </div>
            <div className={`collections__playlists _${theme}`}>
                {props.data}
            </div>
        </div>
        )}
        </ThemeContext.Consumer>
    );
}
