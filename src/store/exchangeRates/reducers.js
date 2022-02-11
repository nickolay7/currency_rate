import ACTypes from "../types";

const initialState = {
  exchangeRatesData: {},
  currentExchangeRate: {},
  dateNow: '',
};

export const exchangeRates = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ACTypes.EXCHANGE_RATES_DATA:
      return {
        ...state,
        exchangeRatesData: payload,
      };
    case ACTypes.RESET_RATES_DATA:
      return {
        ...state,
        exchangeRatesData: {},
      };
    case ACTypes.EXCHANGE_RATE:
      return {...state, currentExchangeRate: payload};
    default:
      return state;
  }
};
