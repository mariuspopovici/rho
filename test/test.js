'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var rho = require('../index');

describe('#rho', function() {
    it('test with known values', function() {
        var result = rho(20.5, 1019.3, 20.5);
        expect(result.toFixed(4)).to.equal('1.1984');
    });

    it('test with known values, adjust to altitude', function() {
        var result = rho(20, 1010, 20, 'metric', 2000);
        expect(result.toFixed(4)).to.equal('0.9402');
    });

    it('test with known values, adjust to altitude', function() {
        var result = rho(11.05, 1003, -7, 'metric', 1855);
        expect(result.toFixed(4)).to.equal('0.9820');
    });

    it('test with known values and imperial units', function() {
        var result = rho(68.9, 30.1, 68.9, 'imperial');
        expect(result.toFixed(4)).to.equal('1.1984');
    });

    it('test conversion to pounds per cubic feet', function() {
        var result = rho(68.9, 30.1, 68.9, 'imperial');
        expect(result.toPoundsPerCubicFeet().toFixed(4)).to.equal('0.0748');
    });

    it('should validate unit types', function() {
        assert.throws(function () { rho(1, 2, 3, 'invalid_unit_type') }, Error, "Invalid units type specified. Valid unit types  are `metric` or `imperial`");
    });

    it('should validate temperature', function() {
        assert.throws(function () { rho("temp", 2, 3) }, Error, "Temperature is not a number.");
    });

});