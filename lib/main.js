var buttons = require('sdk/ui/button/action');
var { ToggleButton } = require("sdk/ui/button/toggle");
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var config = {};
config['include'] = '*.onliner.by';
config['injectJS'] = ["./jquery.js", "./content.js"];

var pageWorker;
var buttonLabel = 'Currency converter';
var buttonLabelState = {
  ready: ' (ready to work)',
  notReady: ' (not ready)'
};

//var button = buttons.ActionButton({
var button = ToggleButton({
  id: "currency-converter-btn",
  label: buttonLabel,
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  badge: 'blr',
  badgeColor: "#00AAAA",
  onClick: onToggleClick
});

updateButtonLabel(buttonLabelState.notReady);

function updateButtonLabel(state) {
  button.label = buttonLabel + state;
}

function onWorkerDetached() {
  pageWorker = null;
  updateButtonLabel(buttonLabelState.notReady);
}

function onWorkerAttached(worker) {
  worker.on('detach', onWorkerDetached);
  pageWorker = worker;
  updateButtonLabel(buttonLabelState.ready);
}

pageMod.PageMod({
  include: config.include,
  contentScriptFile: config.injectJS,
  onAttach: onWorkerAttached
});
// Listen for tab content loads.
//tabs.on('ready', function(tab) {
//  if (/onliner\.by/.test(tab.url)) {
//    console.log('attached');
//    tabs.activeTab.attach({
//      // native implementation of window.confirm will be used
//      contentScriptFile: ["./jquery.js", "./content.js"]
//    });
//  }
//});

var clickCounter = 1;
function onToggleClick(state) {
  if (pageWorker) {
    pageWorker.port.emit('alertValue', 'You clicked ' + clickCounter + ' times');
    clickCounter++;
    //pageWorker.port.on("getInitialValue", function (inValue) {
    //  console.log(inValue);
    //});
    button.badge = (state.checked) ? '$' : 'blr';
  }
}

function handleClick(state) {
	//console.dir(tabs.activeTab);
	tabs.open("http://catalog.onliner.by");
}