'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate;

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          payment_id = params.payment_id,
          rest = _objectWithoutProperties(params, ['from', 'to', 'count', 'skip', 'payment_id']);

      var url = '/refunds';

      if (payment_id) {
        url = '/payments/' + payment_id + '/refunds';
      }

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: url,
        data: _extends({
          from: from,
          to: to,
          count: count,
          skip: skip
        }, rest)
      }, callback);
    },
    fetch: function fetch(refundId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];
      var payment_id = params.payment_id;

      if (!refundId) {
        throw new Error('`refund_id` is mandatory');
      }

      var url = '/refunds/' + refundId;

      if (payment_id) {
        url = '/payments/' + payment_id + url;
      }

      return api.get({
        url: url
      }, callback);
    }
  };
};