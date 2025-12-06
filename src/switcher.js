var gdialog;
var gform;
var gisDialog = window.HTMLDialogElement ? true : false;
var gselectEl;
var gthemes;
var gfirstTheme = 0;
var gtheme
function showDialog(){
	if(!gdialog){
		if(!gtheme){
			gtheme = localStorage.getItem('tjm-theme');
		}
		//--set up dialog
		gdialog = document.createElement(gisDialog ? 'dialog' : 'div');
		if(gisDialog){
			gdialog.closedBy = 'any';
		}
		gdialog.classList.add('tjmThemeSwitchDialog');

		//--set up form
		var formEl = document.createElement('form');
		formEl.classList.add('tjmThemeSwitch');
		formEl.innerHTML = gform || '<label>Switch theme</label> <select><select>';
		gdialog.appendChild(formEl);
		gselectEl = formEl.querySelector('select');
		buildOpts(gthemes, gselectEl);
		gselectEl.addEventListener('change', setTheme);
		formEl.addEventListener('submit', setTheme);

		//--add close button
		var closeEl = document.createElement('button');
		closeEl.classList.add('closeBtn');
		closeEl.innerHTML = '<b>Close dialog</b>';
		closeEl.setAttribute('title', 'Close dialog');
		closeEl.setAttribute('type', 'button');
		closeEl.addEventListener('click', closeDialog);
		gdialog.appendChild(closeEl);

		document.body.appendChild(gdialog);
	}
	if(gisDialog){
		gdialog.showModal();
	}else{
		gdialog.hidden = false;
	}
};
function closeDialog(){
	if(gisDialog){
		gdialog.close();
	}else{
		gdialog.hidden = true;
	}
};
function setTheme(){
	var val = gselectEl.value;
	if(val === gfirstTheme){
		//-# unsetting ensures user will get whatever the default is set to
		localStorage.removeItem('tjm-theme');
	}else{
		localStorage.setItem('tjm-theme', val);
	}
	if(window.TJM_THEMELOAD){
		window.TJM_THEMELOAD(val);
	}else{
		location.reload();
	}
};
//==
function buildOpt(opt, value, parnt){
	var optType = typeof opt === 'object' ? 'optgroup' : 'option';
	var optEl = document.createElement(optType);
	if(optType === 'option'){
		if((value === null ? opt : value) === gtheme){
			optEl.selected = true;
		}
		if(value !== null){
			optEl.value = value;
		}
		optEl.innerHTML = opt;
	}else{
		optEl.label = value;
		buildOpts(opt, optEl);
	}
	parnt.appendChild(optEl);
};
function buildOpts(opts, parnt){
	if(opts instanceof Array){
		for(var i = 0; i < opts.length; ++i){
			buildOpt(opts[i], null, parnt);
		}
	}else{
		for(var i in opts){
			if(opts.hasOwnProperty(i)){
				buildOpt(opts[i], i, parnt);
			}
		}
	}
};

/*==
*/
export default function switcher(
	//- array: first is considered default
	themes,
	//- string: HTML to use for button that pops up dialog
	btn,
	//- string selector: location to stick button
	btnPlace,
	//- method for inserting btn
	btnMethod,
	//- string: HTML of form in dialog, first select will have theme options inserted
	form
){
	if(themes && window.localStorage){
		gthemes = themes;
		//--get first key of themes for default check
		if(themes instanceof Array){
			gfirstTheme = themes[0];
		}else{
			for(var i in themes){
				gfirstTheme = i;
				break;
			}
		}
		gform = form;
		var btnWrap = document.createElement('div');
		btnWrap.innerHTML = btn || '<button class="tjmThemeSwitchButton">Switch theme</button>';
		btnWrap = btnWrap.firstChild;
		if(!btnPlace){
			btnPlace = document.body;
		}else if(typeof btnPlace === 'string'){
			btnPlace = document.querySelector(btnPlace);
		}
		if(btnMethod === 'insertBefore' || btnMethod === 'insertAfter'){
			btnPlace.parentNode[btnMethod](btnWrap, btnPlace);
		}else{
			btnPlace[btnMethod || 'appendChild'](btnWrap);
		}
		btn = btnWrap.querySelector('a,button') || btnWrap;
		btn.addEventListener('click', function(){
			showDialog();
		});
	}
};

