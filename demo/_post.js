import switcher from './_src/switcher.js';
switcher(
	//-# array example
	// ['default', 'blue', 'orange', 'green', 'light-green', 'red', 'yellow']
	//-# object example
	{
		'default': 'Default',
		'blue': 'Blue',
		'orange': 'Orange',
		'green': 'Green',
		'light-green': 'Light Green',
		'red': 'Red',
		'yellow': 'Yellow',
		'': '--None--',
		'Third Party': {
			'https://unpkg.com/magick.css': 'Magick CSS',
			'https://unpkg.com/papercss@1.9.2/dist/paper.min.css': 'Paper CSS',
			'https://cdn.simplecss.org/simple.min.css': 'Simple CSS',
			'https://www.w3.org/StyleSheets/Core/Chocolate': 'W3C Chocolate',
			'https://www.w3.org/StyleSheets/Core/Modernist': 'W3C Modernist'
		}
	}
);
