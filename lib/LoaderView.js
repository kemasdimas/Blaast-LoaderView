var LinearLayout = require('ui').LinearLayout;

// Create a LoaderView custom control. Derive it from LinearLayout using extend().
exports.LoaderView = LinearLayout.extend({
	frameCounter: 0,
	maxFrame: 0,
	loadingTimer: {},
	imageView: {},
	
	/*
	 * imageUrl: loader image location
	 * width: loader image per frame width
	 * frameCount: loader image frames count
	 * loadingText: LoaderView loading text caption (optional)
	 */
	initialize: function(imageUrl, width, frameCount, loadingText) {
		exports.LoaderView.__super__.initialize.call(this);

		var TextView = require('ui').TextView;
		var ImageView = require('ui').ImageView;

		this.style({
			orientation: 'horizontal',
			width: 'fill-parent',
			border: 5,
			padding: 10,
			align: 'center',
			'background-color': '#000'
		});

		this.maxFrame = frameCount;

		// Create an ImageView for showing the loading image
		this.imageView = new ImageView();
		this.imageView.style({
			width: width
		});
		this.imageView.src(app.resourceURL(imageUrl));
		this.imageView.frame(0, this.maxFrame);
		
		// Create a TextView for showing loading text
		var name = new TextView({
			label: (loadingText === undefined) ? 'Loading...' : loadingText,
			style: {
				height: 'fill-parent',
				valign: 'middle',
				color: 'white'
			}
		});

		// Add the ui controls to this LoaderView
		this.add(this.imageView);
		this.add(name);
		this.hide();
	},
	
	startLoading: function() {
		var item = this;
		
		item.show();
		this.loadingTimer = setInterval(function() {
			item.frameCounter = (item.frameCounter + 1) % item.maxFrame;
			item.imageView.frame(item.frameCounter, item.maxFrame);
		}, 100);
	},
	
	stopLoading: function() {
		clearInterval(this.loadingTimer);
		this.frameCounter = 0;
		this.hide();
	}
});