//门店和套餐搜索条件鼠标滑过样式
$($('table').find('li')).hover(function() {
		$(this).addClass('li_style');
	}, function() {
		$(this).removeClass('li_style');
	})
	//导航划过改变样式
$('.nav li').hover(function() {
		$(this).attr('style', 'cursor:pointer');
	}, function() {
		$(this).attr('style', '');
	})
	//获取参数值
function getParamValue(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
}
//最小高度
function minHeight() {
	var centerH = $('.minHeightJS').height();
	var footerH = $('#fheight').outerHeight();
	var headerH = $('.headerHJS').outerHeight();
	var CSH = $(window).height();
	var finalHO = CSH - footerH;
	var finalHT = finalHO - headerH;
	if(headerH == null) {
		if(centerH < finalHO) {
			$('.minHeightJS').css({
				'height': finalHO + 'px'
			});
		}
	} else {
		if(centerH < finalHT) {
			$('.minHeightJS').css({
				'height': finalHT + 'px'
			});
		}
	}

}
//验证身份证号
function IdentityCodeValid(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var tip = "";
	var pass = true;

	if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
		tip = "身份证号格式错误";
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		tip = "身份证号地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				tip = "身份证校验位错误";
				pass = false;
			}
		}
	}
	if(!pass) alert(tip);
	return pass;
}

function getResult(minuend, reduction) {
	return Math.round((parseFloat(minuend) - parseFloat(reduction)) * 100) / 100;
}
// 时间转换
function getLocalTime(timeStamp) {
	// timeStamp = parseInt(timeStamp) / 1000;
	var date = new Date(parseInt(timeStamp));
	var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return date.getFullYear() + "-" + month + "-" + currentDate;
}
// 空字符格式
function nullformat(str) {
	return str == null ? "" : str;
}
//获取所有上级菜单
function menuList() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(departmentInfo_getEnterpriseDepList_url, null, otype, osync);
	if(reqResult.result == 0) {
		var datal = reqResult.data;
		var provSelect = $('.menuList');
		var html = "<option selected='selected' value=''>无</option>";
		for(var i = 0; i < datal.length; i++) {
			html += "<option value= '" + datal[i].enterpriseDepId + "'>" + datal[i].enterpriseDepName + "</option>";
		}
		$(".menuList").empty().append(html);

	} else {

		$(".menuList").val('');
	}
}
//获取所有性别信息
function sex() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(dictSexListByStatus_url, null, otype, osync);
	if(reqResult.result == 0) {
		var datal = reqResult.data;
		var html = "<option selected='selected' value=''>--请选择--</option>";
		for(var i = 0; i < datal.length; i++) {
			html += "<option value= '" + datal[i].idSex + "'>" + datal[i].sexName + "</option>";
		}
		$(".sexInfo").empty().append(html);

	} else {

		$(".sexInfo").val('');
	}
}
//获取所有支付状态
function payForStatus() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(payfor_getCustomerOrderList_url, null, otype, osync);
	if(reqResult.result == 0) {
		var datal = reqResult.data;
		var html = "<option selected='selected' value=''>--请选择--</option>";
		for(var i = 0; i < datal.length; i++) {
			html += "<option value= '" + datal[i].statusId + "'>" + datal[i].statusName + "</option>";
		}
		$(".payForStatus").empty().append(html);

	} else {

		$(".payForStatus").val('');
	}
}
//获取购买流程页面type 1门店 2套餐 3登记 4购买 5上门体检
function getSteps(type) {
	var stepsStr = "<ul class='payProcess'><li><div><div>" +
		"<img src='/upload/2016/12/05/201612051055242475790.jpg' id='selectBranch'>" +
		"<span>1.选择门店</span>" +
		"</div></div><span>>></span></li> " +
		"<li><div><div>" +
		"<img src='/upload/2016/12/05/201612051055242475790.jpg' id='selectSuite'>" +
		"<span >2.选择套餐</span></div></div><span>>></span></li> " +
		"<li><div><div>" +
		"<img src='/upload/2016/12/05/201612051055240896766.jpg'>" +
		"<span>3.登记预约</span></div></div><span>>></span></li>" +
		"<li><div><div>" +
		"<img src='/upload/2016/12/05/201612051055240896766.jpg'>" +
		"<span>4.在线支付</span></div></div> <span>>></span></li>" +
		"<li><div><div>" +
		"<img src='/upload/2016/12/05/201612051055240892957.png'>" +
		"<span>5.上门体检</span></div></div></li></ul>";

	$('.steps').html(stepsStr);
	$('.steps ul li').eq(type).prevAll().find('div').find('div').addClass('select');
	$('.steps ul li').eq(type).prevAll().find('div').find('div').find('span').addClass('selectSpan');
}

//是否登入  1.个人登入 2.企业登入 3未登入
//function isLogin() {
//	var storageVal = JSON.parse(sessionStorage.getItem("storageVal"));
//	var storageRegisterVal = JSON.parse(sessionStorage.getItem("storageRegisterVal"));
//	if(storageVal != null && storageRegisterVal == null) {
//		return '1';
//	} else if(storageVal == null && storageRegisterVal != null) {
//		return '2';
//	} else if(storageVal == null && storageRegisterVal == null) {
//		return '3';
//	}
//}
//获取有效亲友关系列表
function relationship_info() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(getValidRelationshipUrl, null, otype, osync);
	if(reqResult.result == 0) {
		var datal = reqResult.data;
		var provSelect = $('.relationship');
		var html = "<option selected='selected' value=''>全部</option>";
		for(var i = 0; i < datal.length; i++) {
			html += "<option value= '" + datal[i].dictRelationId + "'>" + datal[i].dictRelationName + "</option>";
		}
		$(".relationship").empty().append(html);

	} else {

		$(".relationship").val('');
	}
}
//获取发票类型列表
function receiptTypeSelect() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(receiptTypeUrl, null, otype, osync);
	if(reqResult.result == 0) {
		var datal = reqResult.data;
		var provSelect = $('.receiptType');
		var html = "<option selected='selected' value=''>全部</option>";
		for(var i = 0; i < datal.length; i++) {
			html += "<option value= '" + datal[i].idReceipttype + "'>" + datal[i].receipttypeName + "</option>";
		}
		$(".receiptType").empty().append(html);
	} else {
		$(".receiptType").val('');
	}
}
//个人订单搜索条件机构、门店、套餐下拉框回显
function orderListByCustomerId() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(getParametersBycustomerIdUrl, null, otype, osync);
	if(reqResult.result == 0) {
		if(reqResult.data != 0) {
			var dataO = reqResult.orgData;
			var htmlO = "<option selected='selected' value=''>全部</option>";
			for(var i = 0; i < dataO.length; i++) {
				htmlO += "<option value= '" + dataO[i].orgId + "'>" + dataO[i].orgName + "</option>";
			}
			$(".orderOrg").empty().append(htmlO);

			var dataB = reqResult.branchData;
			var htmlB = "<option selected='selected' value=''>全部</option>";
			for(var i = 0; i < dataB.length; i++) {
				htmlB += "<option value= '" + dataB[i].branchId + "'>" + dataB[i].branchName + "</option>";
			}
			$(".orderBranch").empty().append(htmlB);

			var dataS = reqResult.suitData;
			var htmlS = "<option selected='selected' value=''>全部</option>";
			for(var i = 0; i < dataS.length; i++) {
				htmlS += "<option value= '" + dataS[i].suiteId + "'>" + dataS[i].suiteName + "</option>";
			}
			$(".orderSuite").empty().append(htmlS);
		} else {
			$(".orderOrg").empty().append("<option selected='selected' value=''>空</option>");
			$(".orderBranch").empty().append("<option selected='selected' value=''>空</option>");
			$(".orderSuite").empty().append("<option selected='selected' value=''>空</option>");
			return false;
		}
	} else {
		$(".orderOrg").val('');
		$(".orderBranch").val('');
		$(".orderSuite").val('');
	}
}

//封装过期控制代码
function set(key, value) {
	var curTime = new Date().getTime();
	localStorage.setItem(key, JSON.stringify({
		data: value,
		time: curTime
	}));
}

function get(key, exp) {
	var data = localStorage.getItem(key);
	var dataObj = JSON.parse(data);
	if(data == null) {
		var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return;
	} else {
		if(new Date().getTime() - dataObj.time > exp) {
			localStorage.clear();
			console.log('信息已过期');
		} else {
			var dataObjDatatoJson = JSON.parse(dataObj.data)
			return dataObjDatatoJson;
		}
	}
}
//是否登入  1.个人登入 2.企业登入 3未登入
var userLoginName;
var companyLoginName;

function isLogin() {
	var userLoginMsg = JSON.parse(localStorage.getItem('userInformation'));
	var compLoginMsg = JSON.parse(localStorage.getItem('companyInformation'));
	if(userLoginMsg != null && compLoginMsg == null) {
		var userAutoSave = JSON.parse(JSON.parse(localStorage.getItem('userInformation')).data).auto;
		if(userAutoSave == 0) {
			var userDataObjData = get('userInformation', 1000 * 60 * 60 * 24 * 7);
		} else {
			var userDataObjData = get('userInformation', 1000 * 60 * 60);
		}
	} else if(userLoginMsg == null && compLoginMsg != null) {
		var companyAutoSave = JSON.parse(JSON.parse(localStorage.getItem('companyInformation')).data).auto;
		if(companyAutoSave == 0) {
			var companyDataObjData = get('companyInformation', 1000 * 60 * 60 * 24 * 7);
		} else {
			var companyDataObjData = get('companyInformation', 1000 * 60 * 60);
		}
	}
	if(companyDataObjData == null && userDataObjData != null) {
		userLoginName = userDataObjData.userphone;
		return '1';
	} else if(companyDataObjData != null && userDataObjData == null) {
		companyLoginName = companyDataObjData.companyphone;
		return '2';
	} else if(companyDataObjData == null && userDataObjData == null) {
		return '3';
	}
}
//退出
function exit() {
	var otype = "get";
	var osync = false;
	var reqResult = httpRequest(loginOutUrl, null, otype, osync);
	if(reqResult.result == 0) {
		alert(reqResult.data);
		localStorage.clear();
		window.location.href = "/order/index.shtml";
	} else {
		alert(reqResult.message);
	}
}
//鼠标滑过
$(".brands-list li a").hover(function() {
	$(this).find(".shine").stop();
	$(this).find(".shine").css("background-position", "-300px 0");
	$(this).find(".shine").animate({
		backgroundPosition: '300px 0'
	}, 500);
	$(this).find(".title").stop().animate({
		left: '0px'
	}, {
		queue: false,
		duration: 450
	});
}, function() {
	$(this).find(".title").stop().animate({
		left: '-160px'
	}, {
		queue: false,
		duration: 200
	});
});