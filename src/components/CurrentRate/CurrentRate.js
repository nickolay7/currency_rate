import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExchangeRatesDataThunk } from "../../store/exchangeRates/actions";
import Alert from '../Alert/Alert';
import { nanoid } from 'nanoid';

const CurrentRate = () => {
  const dispatch = useDispatch();
  const exchangeRatesData = useSelector(
    (store) => store.exchangeRates.exchangeRatesData
  );
  const [currencyFrom, setCurrencyFrom] = useState('');

  const rates = Object.entries(exchangeRatesData);
  const currencies = ['USD', 'EUR', 'RUB'];

  useEffect(() => {
    if (currencyFrom) {
      dispatch(getAllExchangeRatesDataThunk(currencyFrom, currencies));
    }
  }, [currencyFrom]);

  const onInputText = ({ target: { value } }) => {
    setCurrencyFrom(() => value);
  };

  return (
    <div className="w-25 mx-auto mt-5">
      <div>
        {rates?.map(([key, value]) => {
          const currenciesString = key.replace('_', " in ");
          return <Alert key={nanoid()} message={`${currenciesString} = ${value}`} />;
        })}
      </div>
      <div className="">
        <select onChange={onInputText} className="form-select text-primary">
          { currencies
            .map((el) => <option key={nanoid()}>{el}</option>)
          }
        </select>
      </div>
    </div>
  );
};
export default React.memo(CurrentRate);
