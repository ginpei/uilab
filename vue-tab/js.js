// Simple jQuery
var $buttons = $('#app-jquery .tab-button');
var $contents = $('#app-jquery .tab-content');
$buttons.first().addClass('tab-button--active');
$buttons.on('click', function(event) {
	event.preventDefault();

	$buttons.removeClass('tab-button--active');
	$contents.hide();

	var $button = $(event.currentTarget);
	$button.addClass('tab-button--active');

	var id = $button.attr('href').slice(1);  // '#foo' -> 'foo'
	var $content = $('#' + id);
	$content.show();
});
$contents.hide();
$contents.first().show();

/* ---------------------------------------------------------------- */

// Better jQuery
(function() {
	var $buttons;
	var $contents;
	var selectedId;

	initialize();

	function initialize() {
		var $container = $('#app-jquery2');
		$buttons = $container.find('.tab-button');
		$contents = $container.find('.tab-content');

		selectedId = getIdFromHref($buttons.first());
		activate(selectedId);

		$buttons.on('click', function(event) {
			event.preventDefault();

			var $button = $(event.currentTarget);
			selectedId = getIdFromHref($button);
			activate(selectedId);
		});
	}

	function activate(id) {
		$buttons.removeClass('tab-button--active');
		$buttons.filter('[href="#' + id + '"]').addClass('tab-button--active');

		$contents.removeClass('tab-content--active');
		$contents.filter('#' + id).addClass('tab-content--active');
	}

	function getIdFromHref($link) {
		var id = $link.attr('href').slice(1);  // '#foo' -> 'foo'
		return id;
	}
})();

/* ---------------------------------------------------------------- */

// Simple Vue
var app = new Vue({
	el: '#app',
	data: {
		contentId: 'jquery',
	},
	methods: {
		jquery_onClick: function(event) {
			this.contentId = 'jquery';
		},
		vue_onClick: function(event) {
			this.contentId = 'vue';
		},
	},
});

/* ---------------------------------------------------------------- */

// Better Vue
var tabButton = {
	template: document.querySelector('#template-tab-button').text,
	props: [
		'id',
		'selectedId',
		'onSelect',
	],
	computed: {
		href: function() {
			return `#${this.id}`;
		},
	},
	methods: {
		button_onClick: function(event) {
			this.onSelect(event, this.id);
		},
	},
};

var tabContent = {
	template: document.querySelector('#template-tab-content').text,
	props: [
		'id',
		'selectedId',
	],
};

var app2 = new Vue({
	el: '#app2',
	data: {
		selectedId: 'jquery',
	},
	methods: {
		selectedId_onChange: function(event, id) {
			this.selectedId = id;
		},
	},

	components: {
		tabButton,
		tabContent,
	},
});
