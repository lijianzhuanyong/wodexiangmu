"use strict";$.fn.materializeInputs=function(t){function i(t){t.setAttribute("value",t.value)}void 0===t&&(t="input, textarea"),this.find(t).each(function(){i(this)}),this.on("keyup",t,function(){i(this)})};