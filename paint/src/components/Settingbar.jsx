import React from "react";
import toolState from "../store/toolState";
import '../styles/toolbar.scss';

const Settingbar = () => {
    return (
        <div className="settingbar">
            <label htmlFor="line-width">Толщина линии</label>
            <input onChange={e=>toolState.setLineWidth(e.target.value)} id="line-width" type = "number" defaultValue={1} min={1} max={50}/>

            <label htmlFor="stroke-color">Цвет обводки</label>
            <input onChange={e=>toolState.setStrokeColor(e.target.value)} id="stroke-color" type = "color"/>
        </div>
    );
};

export default Settingbar;