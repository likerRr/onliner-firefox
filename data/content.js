var $j = jQuery.noConflict();

var globValue;

self.port.on("alertValue", function (inValue) {
	globValue = inValue;
	alert(inValue);
});

$j(document).ready(function() {
	var $priceSelector = $j('.pprice, .product-aside__price--primary, .b-offers-desc__info-sub > a');
  var currency = parseInt($j('#currency-informer > a > ._u').text().replace(/[\s\$]+/g, ''), 10);

	$priceSelector.each(function() {
		var originalPriceStr = $j(this).text();
		var priceWithoutSpaces = originalPriceStr.trim().replace(/\s/g, '');
		var prices = priceWithoutSpaces.split('-');
		prices = prices.map(function(el) {
			return Math.floor(el.match(/[0-9]*/g, '')[0] / currency);
		});
		$j(this).text('~ ' + prices.join(' - ') + ' $');
	});
});