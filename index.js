'use strict';

const constants = require('./constants');

/**
 * Calculates air density based on air temperature, air pressure and dew point.
 * @param {number} temperature - Air temperature in degrees Celcius (C) or Fahrenheit (F) depending on unit type.
 * @param {number} pressure  - Air pressure in hPA or inHg depending on units type.
 * @param {number} dewPoint - Dew point in degrees Celcius (C) or Fahrenheit (F) depending on unit type.
 * @param {string} [units=metric] - Units type (metric or imperial). Defaults to metric.
 * @param {string} [altitude=0] - Altitude at measurement location.  
 * 
 * @returns {number} Returns the value of rho in kg / m3 (air density) for the value of temperature, air presure and dew point. 
 */
module.exports = function (temperature, pressure, dewPoint, units = constants.METRIC, altitude = 0) {
  if (![constants.METRIC, constants.IMPERIAL].includes(units)) {
    throw new Error('Invalid units type specified. Valid unit types  are `metric` or `imperial`');
  }

  if (!isNumber(temperature)) {
    throw new Error('Temperature is not a number.');
  }

  if (!isNumber(pressure)) {
    throw new Error('Pressure is not a number.');
  }

  if (!isNumber(dewPoint)) {
    throw new Error('Dew point is not a number.');
  }

  const t = units === constants.IMPERIAL ? convertTemperatureToMetric(temperature) : temperature;
  let ap = units === constants.IMPERIAL ? convertPressureToMetric(pressure) : pressure;
  const tdew = units === constants.IMPERIAL ? convertTemperatureToMetric(dewPoint) : dewPoint;

  if (altitude > 0) {
    let h = constants.IMPERIAL ? convertAltitudeToMetric(altitude) : altitude;
    ap = pressureAtAltitude(ap, h, t);
  }

  const es = satVP(t); // saturation vapor pressure
  const pv = satVP(tdew)  // pressure of water vapor
  const pd = (ap - pv); // pressure of dry air
  const tk = t + 273.15; // temperature in degrees Kelvin

  const rho = ((pv * 100) / (constants.rv * tk)) + ((pd * 100) / (constants.rd * tk));

  Number.prototype.toPoundsPerCubicFeet = function () {
    return this.valueOf() * 0.062427973725314;
  }

  return rho;
};

/**
 * Adjusts pressure reported as sea level for specified altitude.
 * @param {Number} p air pressure at ref. level (sea level)
 * @param {Number} h altitude
 * @param {Number} T temperature at altitude h in K
 */
function pressureAtAltitude(p, h, T) {
  return p * Math.exp(-constants.g * constants.M * h / (constants.R * (T + 273.15)));
}

/**
 * Check if value provided is a number.
 * @param {} value - The value to check.
 * @returns {boolean} Returns true when value is a number and false otherwise. 
 */
function isNumber(value) {
  return typeof (value) === "number";
}

/**
 * Calculates staturation vapor pressure
 * @param {number} t - Temperature in degrees Celcius
 */
function satVP(t) {
  const eso = 6.1078;
  const p = constants.c0 + t * (constants.c1 + t * (constants.c2 + t * (constants.c3
    + t * (constants.c4 + t * (constants.c5 + t * (constants.c6
      + t * (constants.c7 + t * (constants.c8 + t * (constants.c9)))))))));

  return eso / Math.pow(p, 8);
}

/**
 * Converts temperatures in degrees Fahrenheit to degrees Celcius
 * @param {number} temperature - Temperature in degrees Fahrenheit
 */
function convertTemperatureToMetric(temperature) {
  return (temperature - 32) * 5 / 9;
}

/**
 * Convert inches of mercury to hectopascals
 * @param {number} pressure - Pressure in inches of mercury (inHg)
 */
function convertPressureToMetric(pressure) {
  return pressure * 33.86389;
}

/**
 * Convert altitude to metric.
 * @param {number} altitude - Altitude in ft.
 */
function convertAltitudeToMetric(altitude) {
  return altitude / 3.281;
}
