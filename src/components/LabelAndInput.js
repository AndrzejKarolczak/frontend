import React from "react";

export default function LabelAndInput(props) {

    return (
        <div className="col-2 mb-3 mr-1">
            <label htmlFor={props.id} className="form-label">{props.labelText}</label>
            <input id={props.id} type="number" value={props.value} name={props.id}
                   required="required" step="0.0001" min="0.0001" pattern="\d+"
                   onChange={e => props.onChangeFunction(e)}/>
        </div>
    );
}