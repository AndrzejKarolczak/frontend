import React from "react";
import './OptionsForm.css'
import LabelAndInput from "./LabelAndInput";

class OptionsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {spotPrice: '', exercisePrice: '', baseCurrencyInterestRate: '', quotedCurrencyInterestRate: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        alert(event.target.value);
        let returned;
        switch (event.target.name) {
            case 'spotPrice':
                returned = {
                    spotPrice: event.target.value,
                    exercisePrice: this.state.exercisePrice,
                    baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                    quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                };
                break;
            case 'exercisePrice':
                returned = {
                    spotPrice: this.state.spotPrice,
                    exercisePrice: event.target.value,
                    baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                    quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                };
                break;
            case 'baseCurrencyInterestRate':
                returned = {
                    spotPrice: this.state.spotPrice,
                    exercisePrice: this.state.exercisePrice,
                    baseCurrencyInterestRate: event.target.value,
                    quotedCurrencyInterestRate: this.state.quotedCurrencyInterestRate
                };
                break;
            case 'quotedCurrencyInterestRate':
                returned = {
                    spotPrice: this.state.spotPrice,
                    exercisePrice: this.state.exercisePrice,
                    baseCurrencyInterestRate: this.state.baseCurrencyInterestRate,
                    quotedCurrencyInterestRate: event.target.value
                };
                break;
        }

        this.setState(returned);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.spotPrice);
        event.preventDefault();
    }


    render() {
        return (
            <div className="container col-md-4">
                <form onSubmit={this.handleSubmit}>
                    <section>
                        <LabelAndInput id={"spotPrice"}
                                       labelText={"Bieżąca wartość kursu"}
                                       value={this.state.spotPrice}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"exercisePrice"}
                                       labelText={"Kurs wykonania opcji"}
                                       value={this.state.exercisePrice}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"baseCurrencyInterestRate"}
                                       labelText={"Stopa procentowa waluty bazowej"}
                                       value={this.state.baseCurrencyInterestRate}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"quotedCurrencyInterestRate"}
                                       labelText={"Stopa procentowa waluty kwotowanej"}
                                       value={this.state.quotedCurrencyInterestRate}
                                       onChangeFunction={this.handleChange}/>
                        <LabelAndInput id={"volatility"}
                                       labelText={"Zmienność kursu"}
                                       value={this.state.quotedCurrencyInterestRate}
                                       onChangeFunction={this.handleChange}/>
                    </section>
                    <br/>
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </form>
            </div>
        );
    }
}

export default OptionsForm;