import axios from 'axios';
import ACTypes from "../types";

export const changeExchangeRatesData = (data) => ({
  type: ACTypes.EXCHANGE_RATES_DATA,
  payload: data,
});

export const resetExchangeRatesData = () => ({
  type: ACTypes.RESET_RATES_DATA,
});

export const saveCurrentExchangeRate = (rate) => ({
  type: ACTypes.EXCHANGE_RATE,
  payload: rate,
});

export const getExchangeRatesDataThunk =
  (currencyFrom, currencyTo) => async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=${process.env.REACT_APP_TOKEN}`
      );
      dispatch(saveCurrentExchangeRate(data));
    } catch (err) {
      console.log(err);
    }
  };

export const getAllExchangeRatesDataThunk =
  (currencyFrom, currencies) => async (dispatch) => {
    try {
      dispatch(resetExchangeRatesData());
      let allData = {};
      for (let currencyTo of currencies) {
        if (currencyTo !== currencyFrom) {
          const { data } = await axios.get(
            `https://free.currconv.com/api/v7/convert?q=${currencyFrom}_${currencyTo}&compact=ultra&apiKey=${process.env.REACT_APP_TOKEN}`
          );
          allData = { ...allData, ...data };
        }
      }
      dispatch(changeExchangeRatesData(allData));
    } catch (err) {
      console.log(err);
    }
  };
