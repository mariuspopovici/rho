exports.METRIC = 'metric';
exports.IMPERIAL = 'imperial'; 

// Herman Wobus polynomials
exports.c0 = 0.99999683;
exports.c1 = -0.90826951 * Math.pow(10,-2);
exports.c2 = 0.78736169 * Math.pow(10,-4);
exports.c3 = -0.61117958 * Math.pow(10,-6);
exports.c4 = 0.43884187 * Math.pow(10,-8);
exports.c5 = -0.29883885 * Math.pow(10,-10);
exports.c6 = 0.21874425 * Math.pow(10,-12);
exports.c7 = -0.17892321 * Math.pow(10,-14);
exports.c8 = 0.11112018 * Math.pow(10,-16);
exports.c9 = -0.30994571 * Math.pow(10,-19);

exports.rd = 287.0531; // gas constant for dry air
exports.rv = 461.4964; //  gas constant for water vapor
exports.g = 9.80665; // gravitational acceleration
exports.M = 0.0289644 // the molar mass of air
exports.R = 8.31432 //  universal gas constant