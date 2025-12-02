var gcssPath;
var gcssSelector;
var gdefaultTheme
function loadCss(theme){
	var styleEl = document.querySelector(gcssSelector || 'link[rel="stylesheet"]');
	if(styleEl){
		if(theme){
			styleEl.href = gcssPath + '/' + theme + '.css';
			if(styleEl.disabled){
				styleEl.disabled = false;
			}
		}else{
			styleEl.disabled = true;
		}
	}
};
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
	gdefaultTheme = defaultTheme;
	gcssSelector = cssSelector;
	gcssPath = cssPath;
	var theme = (window.localStorage && localStorage.getItem('tjm-theme') !== null ? localStorage.getItem('tjm-theme') : gdefaultTheme);
	if(typeof theme === 'string'){
		if(cssPath){
			loadCss(theme);
		}
		if(jsPath && theme){
			var jsEl = document.createElement('script');
			jsEl.async = true;
			jsEl.src = jsPath + '/' + theme + '.js';
			var target = document.head || document.body;
			target.appendChild(jsEl);
		}
		if(!jsPath){
			window.TJM_THEMELOAD = loadCss;
		}
	}
};
