import React from "react";

export default function QuoteRow(props) {
    const handleOnPointerEnter = (e) => {
        e.preventDefault();
        document.getElementById(props.quoteDate).hidden = false;
    }

    const handleOnPointerLeave = (e) => {
        e.preventDefault();
        document.getElementById(props.quoteDate).hidden = true;
    }

    return (
        <tr onPointerEnter={handleOnPointerEnter} onPointerLeave={handleOnPointerLeave}>
            <td id="1">{props.quoteDate}</td>
            <td id="2">{props.quoteValue}</td>
            <td id={props.quoteDate} hidden="true" className="buttonTd">
                <div>
                    <input className="btn btn-danger btn-sm mr-1" type="button" name={props.quoteDate} value="Usuń"
                           onClick={e => props.onClickFunction(e)}/>
                    <input className="btn btn-success btn-sm" type="button" name={props.quoteDate} value="Zaznacz"
                           onClick={e => props.onClickFunction(e)}/>
                </div>
            </td>
        </tr>
    );
}