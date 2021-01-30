import React from "react";
import './OptionsForm.css'
import LabelAndInput from "./LabelAndInput";

class OptionsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spotPrice: '',
            exercisePrice: '',
            baseCurrencyInterestRate: '',
            quotedCurrencyInterestRate: '',
            volatility: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleChange(e) {
        let returned;
        // try{
            switch (e.target.name) {
                case 'spotPrice':
                    returned = {
                        spotPrice: e.target.value,
                        exercisePrice: this.state.exercisePrice,
                        baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                        quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                    };
                    break;
                case 'exercisePrice':
                    returned = {
                        spotPrice: this.state.spotPrice,
                        exercisePrice: e.target.value,
                        baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                        quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                    };
                    break;
                case 'baseCurrencyInterestRate':
                    returned = {
                        spotPrice: this.state.spotPrice,
                        exercisePrice: this.state.exercisePrice,
                        baseCurrencyInterestRate: e.target.value,
                        quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                    };
                    break;
                case 'quotedCurrencyInterestRate':
                    returned = {
                        spotPrice: this.state.spotPrice,
                        exercisePrice: this.state.exercisePrice,
                        baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                        quotedCurrencyInterestRate: e.target.value
                    };

                    break;
            }

        this.setState(returned);
    }

    handleSubmit(e) {
        alert('A name was submitted: ' + this.state.spotPrice);
        e.preventDefault();
    }

    handleDownload(e) {
        e.preventDefault();
        let currency = document.getElementById("currency-code").value;
        let term = document.getElementById("term").value;
        let dataDate = document.getElementById("data-date").value;

        if (currency !== "" && term !== "" && dataDate !== "") {
            this.fetchWibor(term, dataDate);
        }


    }

    fetchWibor(term, dataDate) {
        let requestBody = {
            url: 'https://www.money.pl/pieniadze/depozyty/zlotowearch/',
            body: `symbol=WIBOR${term}&od=${dataDate}&do=${dataDate}&period=-1+month&format=csv&show=Poka%BF`
        };

        fetch('http://localhost:3001/money', {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(json => {
                let rate = parseFloat(json.quoteValue.replace(',', '.'));
                let element = document.getElementById("quotedCurrencyInterestRate")
                const event = new Event('input', { bubbles: true })
                element.value = rate / 100;
                element.dispatchEvent(event)
            })
            .catch(e => alert(e));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="col-2">
                    <div className="mb-3">
                        <label className="col-form-label mr-1" htmlFor="currency-code">Wybierz walutę</label>
                        <select className="form-select" name="currency" id="currency-code"
                                onChange={this.handleChange}>
                            <option value="">--Wybierz walutę bazową--</option>
                            <option value="CHF">CHF</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="col-form-label mr-2" htmlFor="term">Wybierz termin wygaśnięcia</label>
                        <select className="form-select" name="term" id="term" onChange={this.handleChange}>
                            <option value="">--Wybierz termin wygaśnięcia--</option>
                            <option value="1M">1M</option>
                            <option value="3M">3M</option>
                            <option value="6M">6M</option>
                            <option value="1Y">1Y</option>
                        </select>
                    </div>


                    <div className="mb-3">
                        <label className="mr-2" htmlFor="data-date">Data kwotowania</label>
                        <input type="date" id="data-date" required name="dataDate"/>
                    </div>

                    <input type="button" value="Pobierz dane" onClick={this.handleDownload}
                           className="btn btn-primary mt-1 mb-4"/>
                </div>

                <div className="col-9 mt-2">
                    <div className="row">
                        <LabelAndInput id={"spotPrice"}
                                       labelText={"Bieżąca wartość kursu"}
                                       value={this.state.spotPrice}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"exercisePrice"}
                                       labelText={"Kurs wykonania opcji"}
                                       value={this.state.exercisePrice}
                                       onChangeFunction={this.handleChange}/>
                    </div>
                    <div className="row ">
                        <LabelAndInput id={"baseCurrencyInterestRate"}
                                       labelText={"Stopa procentowa waluty bazowej"}
                                       value={this.state.baseCurrencyInterestRate}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"quotedCurrencyInterestRate"}
                                       labelText={"Stopa procentowa waluty kwotowanej"}
                                       value={this.state.quotedCurrencyInterestRate}
                                       onChangeFunction={this.handleChange}/>
                    </div>
                    <div className="row">
                        <LabelAndInput id={"volatility"}
                                       labelText={"Zmienność kursu"}
                                       value={this.state.volatility}
                                       onChangeFunction={this.handleChange}/>
                    </div>


                    <input type="submit" value="Wylicz wartość" className="btn btn-primary mt-2"/>
                </div>
            </form>
        );
    }
}

export default OptionsForm;