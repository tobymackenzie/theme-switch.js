var gcssPath;
var gcssSelector;
function loadCss(theme){
	var styleEl = document.querySelector(gcssSelector);
	if(styleEl){
		if(theme){
			//--use built URL unless theme value is a URL, determined by '//' presence
			styleEl.href = theme.indexOf('//') === -1
				? gcssPath + '/' + theme + '.css'
				: theme
			;
			if(styleEl.disabled){
				styleEl.disabled = false;
			}
		}else{
			styleEl.disabled = true;
		}
	}
};
function load(
	//- path to CSS folder with themes CSS, named {theme}.css
	cssPath,
	//- path to JS folder with themes JS, named {theme}.js
	jsPath,
	//- selector of stylesheet el to modify, otherwise modifies first stylesheet
	cssSelector,
	//- default theme key.  If set, will load default theme even if none is set
	defaultTheme
){
	gcssSelector = cssSelector || 'link[rel="stylesheet"]';
	gcssPath = cssPath;
	var theme = (localStorage.getItem('tjm-theme') !== null ? localStorage.getItem('tjm-theme') : defaultTheme);
	if(typeof theme === 'string'){
		//-# can load URL without cssPath
		if(cssPath || theme.indexOf('//') !== -1){
			loadCss(theme);
		}
		//--load JS if path configured, we have theme, and it isn't a URL, since that can only work for one file and that has to be CSS
		if(jsPath && theme && theme.indexOf('//') === -1){
			var jsEl = document.createElement('script');
			jsEl.async = true;
			jsEl.src = jsPath + '/' + theme + '.js';
			var target = document.head || document.body;
			target.appendChild(jsEl);
		}
	}
	if(!jsPath){
		window.TJM_THEMELOAD = loadCss;
	}
};
export default window.localStorage ? load : function(){};
