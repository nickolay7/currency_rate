import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from '../Alert/Alert'
import { getExchangeRatesDataThunk } from "../../store/exchangeRates/actions";

const Converter = () => {
  const dispatch = useDispatch();
  const exchangeRate = useSelector(
    (store) => store.exchangeRates.currentExchangeRate
  );
  const [currencyCourse] = Object.values(exchangeRate);
  const [inputValue, setInputValue] = useState('');
  const [inputNumber, setInputNumber] = useState(0);
  const [inputSecondCurrency, setInputSecondCurrency] = useState('');
  const [firstCurrencyData, setFirstCurrencyData] = useState('');
  const [secondCurrencyData, setSecondCurrencyData] = useState('wait for computed...');

  useEffect(() => {
    const resultNumber = currencyCourse * inputNumber;
    setSecondCurrencyData(`${resultNumber.toFixed(2)} ${inputSecondCurrency}`);
  }, [exchangeRate]);

  const onChangeText = (e) => {
    setInputValue(e.target.value);
  };

  const sendRequest = () => {
    const regExpFindNumber = /\d{1,}/gm;
    const regExpFindRates = /[^\d]\w{3,}/gm;

    const numberArray = inputValue.match(regExpFindNumber);
    const currencyArray = inputValue.match(regExpFindRates);

    const currencyFrom = currencyArray[0].trim().toUpperCase();
    const currencyTo = currencyArray[1].trim().toUpperCase();

    setInputNumber(Number(numberArray[0]));
    setInputSecondCurrency(currencyArray[1].toUpperCase());
    setFirstCurrencyData(
      `${numberArray[0]} ${currencyArray[0].trim().toUpperCase()}`
    );

    dispatch(getExchangeRatesDataThunk(currencyFrom, currencyTo));
  };
  const message = `${firstCurrencyData} = ${secondCurrencyData}`;

  return (
    <div className="d-flex flex-column justify-content-center w-50 mx-auto h-100">
      <input
        type="text"
        name="text"
        onChange={onChangeText}
        placeholder="100 usd in cad"
        className="form-control form-control-lg mb-3 opacity-50 text-primary"
      />
      <button onClick={sendRequest} className="btn btn-warning mb-3 opacity-75 text-primary">
        Calculate course
      </button>
      {inputSecondCurrency && (
        <Alert message={message}/>
      )}
    </div>
  );
};
export default React.memo(Converter);
