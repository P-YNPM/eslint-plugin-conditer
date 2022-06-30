var x = true ? false : true;
//
var x = true <= 150 ? 5 / (1 + Math.exp(-0.1 * (rating.length - 50))) : 1;
//
var x = !y
    ? 0
    : visitCount > 160
    ? 5 / (1 + Math.exp(-0.05 * (visitCount - 80)))
    : Math.log(visitCount) + 2.71;
//
var x = !y
    ? 0
    : visitCount > 160
    ? (function () {
          var x = 1;
          return x;
      })()
    : 1 + Math.exp(-0.05 * (visitCount - 80));
