var app = this;
var _ = require('common/util');

// Import the LoaderView item declaration
var custom = require('../lib/LoaderView');

var loaderView = new custom.LoaderView('loading.png', 48, 12, 'Please wait...');
_.extend(exports, {
	':load': function() {
		console.log('View was loaded');
		
		// Handle InputBox submit event
		var input = this.get('input');
		input.on('submit', function() {
			var text = input.value();
			
			if (text === 'show') {
				loaderView.startLoading();
			} else if (text === 'hide') {
				loaderView.stopLoading();
			}
			
			input.value('');
		});
		
		this.add(loaderView);
	},
	
	':keypress': function(key) {
		console.log('Key press: ' + key);
		
		this.get('input').emit('keypress', key);
	}
});
