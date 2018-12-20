# Rho

A small library which helps estimate air density (rho) based on air temperature, pressure and relative humidity (RH)

## Installation

    `npm install @mariuspopovici/rho`

## Usage

### Parameters
* __temperature__ Air temperature in degrees Celcius (°C) or Fahrenheit (°F) depending on unit type.
* __air pressure__ Air pressure in hPA or inHg depending on units type
* __dew point__ Air temperature in degrees Celcius (°C) or Fahrenheit (°F) depending on 
* __units of measurement__ Optional, defaults to _metric_. Change to _imperial_ to indicate that inputs are in _imperial_ units of measurement.

### Examples

```javascript
    var rho = require('@mariuspopovici/rho');
    // calculate Rho with values expressed in imperial units
    var density = rho(68.9, 30.1, 68.9, 'imperial');
```
    Output should be 1.1984
``` javascript    
    var rho = require('@mariuspopovici/rho');
    // calculate Rho with values expressed in metric units (default)
    var density = rho(20.5, 1019.3, 20.5);
```
    Output should be 1.1984

Result is reported in kg/m<sup>3</sup> and can be optionally converted to lb/ft<sup>3</sup>.

```javascript
    var rho = require('@mariuspopovici/rho');
    // calculate Rho with values expressed in imperial units
    var density = rho(68.9, 30.1, 68.9, 'imperial').toPoundsPerCubicFeet();
```
## Tests

    `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.