/**
 * @param {Object} blob
 * @param {Object} callback
 */
export function imgToBase64(url,callback){
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function(){
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img,0,0);
    var dataURL = canvas.toDataURL('image/png');
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}
/**
 * 判断是否为ios设备
 */
export function isIos() {
	let u = navigator.userAgent
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

/**
 * @param {string} variable
 * 获取url参数 eg：a = getQueryString('a')
 */
export function getQueryString(variable){
   var query = window.location.search.substring(1);
   var vars = query.split("&");
   for (var i=0;i<vars.length;i++) {
		   var pair = vars[i].split("=");
		   if(pair[0] == variable){return pair[1];}
   }
   return(false);
}