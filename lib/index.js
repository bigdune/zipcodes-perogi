const codesUS = require('./codes'),
    states = require('./states'),
    codesCanada = require('./codesCanada');
    timezone = require('moment-timezone');

const codes = {};
codes.codes = Object.assign({}, codesUS.codes, codesCanada.codes);
codes.stateMap = Object.assign({}, codesUS.stateMap, codesCanada.stateMap);

exports.states = states;
exports.codes = codes.codes;

const lookup = function (zip) {
  return codes.codes[zip];
};

exports.lookup = lookup;

const withTime = function (zip) {
  const info = codes.codes[zip];
  if (info && info.timeZoneId) {
    info.time = timezone.tz(info.timeZoneId).format();
  }
  return info;
};

exports.lookupWithTime = withTime;

const byName = function (city, state) {
  const ret = [];
  if (city) {
    city = city.toUpperCase();


    byState(state).forEach(function (item) {
      if (city === item.city.toUpperCase()) {
        ret.push(item);
      }
    });
  }

  return ret;
};

exports.lookupByName = byName;

const byState = function (state) {
  const ret = [];

  if (state) {
    state = states.normalize(state.toUpperCase());


    if (!codes.stateMap[state]) {
      return ret;
    }

    codes.stateMap[state].forEach(function (zip) {
      ret.push(codes.codes[zip]);
    });
  }

  return ret;
};

exports.lookupByState = byState;
