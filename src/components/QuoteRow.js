import React from 'react';

class QuoteRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        //e.preventDefault();
        if (e.target.value === undefined) alert("Nie działa");
        let ddd = e.target.value;
        //alert(ddd);
        console.log(ddd);
        //document.getElementById("quote-date").value = ;
        //document.getElementById("quote-value").value = ;
    }

    render() {
        return (
            <tr onClick={(e) => this.handleClick(e)}>
                <td>{this.props.rowData.quoteDate}</td>
                <td>{this.props.rowData.quoteValue}</td>
            </tr>
        );
    }
}

export default QuoteRow;