function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

//move函数封装
function move(obj, attr, target, speed, callBack) {
	clearInterval(obj.timer);
	//判断移动方向
	var current = parseInt(getStyle(obj, attr));
	if(current > target) {
		speed = -speed;
	}
	//向对象中也添加属性
	obj.timer = setInterval(function() {
		var oldValue = parseInt(getStyle(obj, attr));
		var newVlaue = oldValue + speed;
		if((speed < 0 && newVlaue <= 0) || (speed > 0 && newVlaue > target)) {
			newVlaue = target;
		}
		obj.style[attr] = newVlaue + "px";
		if(newVlaue == target) {
			clearInterval(obj.timer);

			//执行完毕后调用回调函数
			callBack && callBack();
		}
	}, 30);
}

//定义一个函数，向元素中添加属性
function addClass(obj, cn) {
	if(!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
}
//判断元素中是否含有指定class
function hasClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
}

function removeClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
}
//切换一个类，有该类则删除，没有该类则添加
function toggleClass(obj, cn) {
	if(hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn);
	}
}