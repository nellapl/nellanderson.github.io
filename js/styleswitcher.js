jQuery(document).ready(function(){
	jQuery("#show-panel").click(function(){
		if(jQuery(this).hasClass("show-panel")){
			jQuery(".colors-switcher").css({right:0});
			jQuery("#show-panel").removeClass("show-panel");
			jQuery("#show-panel").addClass("hide-panel");
		}
		else{
			if(jQuery(this).hasClass("hide-panel")){
				jQuery(".colors-switcher").css({right:"-100px"});
				jQuery("#show-panel").removeClass("hide-panel");
				jQuery("#show-panel").addClass("show-panel");
			}
		}
	});
});

function setActiveStyleSheet(e){
	var d,c,b;
	for(d=0;(c=document.getElementsByTagName("link")[d]);d++){
		if(c.getAttribute("rel").indexOf("style")!=-1&&c.getAttribute("title")){
			c.disabled=true;if(c.getAttribute("title")==e){c.disabled=false;
			}
		}
	}
}

function getActiveStyleSheet(){
	var c,b;for(c=0;(b=document.getElementsByTagName("link")[c]);c++){
		if(b.getAttribute("rel").indexOf("style")!=-1&&b.getAttribute("title")&&!b.disabled){
			return b.getAttribute("title");
		}
	}

	return null;
}

function getPreferredStyleSheet(){
	var c,b;
	for(c=0;(b=document.getElementsByTagName("link")[c]);c++){
		if(b.getAttribute("rel").indexOf("style")!=-1&&b.getAttribute("rel").indexOf("alt")==-1&&b.getAttribute("title")){
			return b.getAttribute("title");
		}
	}
	return null;
}

function createCookie(c,d,e){
	if(e){
		var b=new Date();
		b.setTime(b.getTime()+(e*24*60*60*1000));
		var a="; expires="+b.toGMTString();
	}
	else{
		a="";
	}
	document.cookie=c+"="+d+a+"; path=/";
}

function readCookie(b){
	var e=b+"=";
	var a=document.cookie.split(";");
	for(var d=0;d<a.length;d++){
		var f=a[d];while(f.charAt(0)==" "){
			f=f.substring(1,f.length);
		}
		if(f.indexOf(e)==0){
		 f.substring(e.length,f.length);
		}
	}

	return null;
}

window.onload=function(b){
	var a=readCookie("style");
	var c=a?a:getPreferredStyleSheet();
	setActiveStyleSheet(c);
};

window.onunload=function(a){
	var b=getActiveStyleSheet();
	createCookie("style",b,365);
};

var cookie=readCookie("style");
var title=cookie?cookie:getPreferredStyleSheet();
setActiveStyleSheet(title);