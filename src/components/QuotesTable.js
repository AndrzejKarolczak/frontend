import React from 'react';
import QuoteRow from "./QuoteRow";
import './QuotesTableStyle.css';
import {Button} from "react-bootstrap";
import NewQuoteRow from "./NewQuoteRow";

class QuotesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "", series: []};
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    fetchAllData() {
        fetch('http://localhost:3001/quotes', {method: 'GET', mode: "cors"})
            .then(response => response.json())
            .then((json) => {
                    this.setState({name: json.name, series: json.series});
                }
            );
    }

    componentDidMount() {
        this.fetchAllData();
    }

    handleButtonClick(e) {
        e.preventDefault();
        let newQuoteDateField = document.getElementById("quote-date");
        let newQuoteValueField = document.getElementById("quote-value");
        let newQuoteDate = newQuoteDateField.value;
        let newQuoteValue = newQuoteValueField.value;

        if (newQuoteDate !== "" && newQuoteValue !== "") {
            let newArray = this.state.series.map(r => r);

            let found = newArray.find(r => r.quoteDate === newQuoteDate);
            if (found !== undefined) {
                found.quoteValue = newQuoteValue;
                this.persistOld(found);
            } else {
                let newRow = {quoteDate: newQuoteDate, quoteValue: newQuoteValue};
                this.persistNew(newRow);
                newArray.push(newRow);
            }

            newArray.sort((l, r) =>
                new Date(l.quoteDate) - new Date(r.quoteDate)
            );

            newQuoteDateField.value = "";
            newQuoteValueField.value = "";
            this.setState({series: newArray});
        }
    }

    handleRowClick(e) {


        alert(`Yess! Name ${e.target.name} - value ${e.target.value}`);
        e.preventDefault();
        document.getElementById("quote-date").value = e.target.quoteDate;
        document.getElementById("quote-value").value = e.target.quoteValue;
    }

    persistNew(newRow) {
        fetch('http://localhost:3001/quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRow)
        })
            .then(response => response.json())
            .then(json => alert(`${json.message} (status: ${json.status})`));
    }

    persistOld(oldRow) {
        fetch(`http://localhost:3001/quotes/${oldRow.quoteDate.toString()}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oldRow)
        })
            .then(response => response.json())
            .then(json => alert(`${json.message} (status: ${json.status})`));
    }

    render() {
        return (
            <div>
                <fieldset>
                    <div>
                        <label htmlFor="quote-date">Data kwotowania</label>
                        <input type="date" id="quote-date" name="quote-date"/>
                    </div>
                    <div>
                        <label htmlFor="quote-value">Wartość kwotowania</label>
                        <input type="number" step="any" min="0.0001" id="quote-value" name="quote-value"/>
                    </div>
                    <Button variant="primary" size="sm" onClick={this.handleButtonClick}>
                        Small button
                    </Button>
                </fieldset>

                <table id="quotes-table">
                    <caption>Kursy {this.state.name}</caption>
                    <thead>
                    <tr>
                        <td>Data kwotowania</td>
                        <td>Wartość kwotowania</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.series.map((quote) =>
                        <NewQuoteRow quoteDate={quote.quoteDate}
                                     quoteValue={quote.quoteValue} onClickFunction={this.handleRowClick}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default QuotesTable;