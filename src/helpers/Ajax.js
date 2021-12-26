import { REQUEST_URL } from "../Config";

export const Ajax = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const globalAjax = async () => {
  try {
    const { cases, recovered, active, deaths } = await Ajax(
      `${REQUEST_URL}all`
    );

    return { cases, recovered, active, deaths };
  } catch (error) {
    throw error;
  }
};

export const continentsAjax = async () => {
  try {
    let result = await Ajax(`${REQUEST_URL}continents`);
    result = result.map(
      ({ cases, recovered, active, deaths, continent, countries }) => ({
        cases,
        recovered,
        active,
        deaths,
        continent,
        countries,
      })
    );

    return result;
  } catch (error) {
    throw error;
  }
};

export const countryAjax = async (country) => {
  try {
    const result = await Ajax(`${REQUEST_URL}countries/${country}`);
    const { cases, recovered, active, deaths } = result;

    return { cases, recovered, active, deaths };
  } catch (error) {
    throw error;
  }
};
