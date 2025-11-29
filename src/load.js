export default function load(
	//- path to CSS folder with themes CSS, named {theme}.css
	cssPath,
	//- path to JS folder with themes JS, named {theme}.js
	jsPath,
	//- selector of stylesheet el to modify, otherwise modifies first stylesheet
	cssSelector,
	//- default theme key.  If set, will load default theme even if none is set
	defaultTheme
){
	var theme = (window.localStorage && localStorage.getItem('tjm-theme')) || defaultTheme;
	if(theme){
		if(cssPath){
			var styleEl = document.querySelector(cssSelector || 'link[rel="stylesheet"]');
			if(styleEl){
				styleEl.href = cssPath + '/' + theme + '.css';
			}
		}
		if(jsPath){
			var jsEl = document.createElement('script');
			jsEl.async = true;
			jsEl.src = jsPath + '/' + theme + '.js';
			var target = document.head || document.body;
			target.appendChild(jsEl);
		}
	}
};
