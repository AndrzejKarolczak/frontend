import React from "react";

export default function NewQuoteRow(props) {
    const handleOnPointerEnter = (e) => {
        e.preventDefault();
        document.getElementById(props.quoteDate).hidden = false;
    }

    const handleOnPointerLeave = (e) => {
        e.preventDefault();
        document.getElementById(props.quoteDate).hidden = true;
    }

    return (
        <tr id="uuu" onPointerEnter={handleOnPointerEnter} onPointerLeave={handleOnPointerLeave}>
            <td id="1">{props.quoteDate}</td>
            <td id="2">{props.quoteValue}</td>
            <td id={props.quoteDate} hidden="true" className="buttonTd">
                <div>
                    <input type="button" name={props.quoteDate} value="Usuń"
                           onClick={e => props.onClickFunction(e)}/>
                    <input type="button" name={props.quoteDate} value="Aktualizuj"
                           onClick={e => props.onClickFunction(e)}/>
                </div>
            </td>
        </tr>
    );
}