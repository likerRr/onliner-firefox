var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

// Listen for tab content loads.
tabs.on('ready', function(tab) {
	tabs.activeTab.attach({
      // native implementation of window.confirm will be used
			contentScriptFile: ["./jquery.js", "./content.js"]
   });
});

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	//console.dir(tabs.activeTab);
  tabs.open("http://catalog.onliner.by/mobile/");
}