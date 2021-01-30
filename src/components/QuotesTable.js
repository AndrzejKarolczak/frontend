import React from 'react';
import './QuotesTableStyle.css';
import QuoteRow from "./QuoteRow";

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
        e.preventDefault();
        if (e.target.value === "Zaznacz") {
            let found = this.state.series.find(r => r.quoteDate === e.target.name);
            document.getElementById("quote-date").value = found.quoteDate;
            document.getElementById("quote-value").value = found.quoteValue;
        } else {
            if (window.confirm('Czy na pewno chcesz usunąć ten rekord?')) {
                let newArray = this.state.series.map(r => r);
                let index = newArray.findIndex(r => r.quoteDate === e.target.name);
                this.delete(e.target.name);
                newArray.splice(index, 1);
                this.setState({series: newArray});
            }
        }
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

    delete(quoteDate) {
        fetch(`http://localhost:3001/quotes/${quoteDate.toString()}`, {
            method: 'DELETE'
        })
            .then(response => alert(`Usunięto (status: ${response.status})`));
    }

    render() {
        return (
            <div className="container col-md-auto">
                <div className="container col-2 leftFloater mt-3">
                    <div className="card ">
                        <div className="card-body cardBackground">
                            <fieldset>
                                <h5 className="card-title mb-3">Dodaj/zmień dane</h5>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="quote-date">Data kwotowania</label>
                                    <input type="date" id="quote-date" required name="quote-date"/>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="quote-value">Wartość kwotowania</label>
                                    <input type="number" step="0.0001" min="0.0001" required id="quote-value"
                                           name="quote-value"/>
                                </div>
                                <input type="button" value="Zapisz" onClick={this.handleButtonClick}
                                       className="btn btn-primary mt-2"/>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <div>
                    <caption>Kursy {this.state.name}</caption>
                    {/*Dziadostwo pojawia się na dole tabeli, gdy wrzucić to między znaczniki table*/}
                    <table id="quotes-table" className="mt-1">
                        <thead>
                        <tr>
                            <td>Data kwotowania</td>
                            <td>Wartość kwotowania</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.series.map((quote) =>
                            <QuoteRow quoteDate={quote.quoteDate}
                                      quoteValue={quote.quoteValue} onClickFunction={this.handleRowClick}/>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default QuotesTable;