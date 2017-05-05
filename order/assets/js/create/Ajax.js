//序列化提交
function httpRequest(httpUrl, httpParam, httpType,async) {
	var reqResult = {"result":1,"message":"没有请求服务器或接受到返回值"};
	$.ajax({
		url : httpUrl, 
		type : httpType,
		async : async,
		data: httpParam,
		contentType:"application/x-www-form-urlencoded;charset=UTF-8",
		dataType : 'json',
		success : function(msg) {
			if (msg.result == 99) {
				alert(msg.message);
				return false;
			}
			reqResult = msg;
			return msg;
		},
		error : function(data) {
			/**
			 * 此处应为弹出公共提示信息窗口
			 * 提示错误信息
			 * 并返回登录页面
			return false;*/
			alert("系统错误，"+data.status);
		}
	});
	return reqResult;
}
//json 格式提交 
function httpJsonRequest(httpUrl, httpParam, httpType, async) {
	var reqResult = {
		"result": 1,
		"message": "没有请求服务器或接受到返回值"
	};
	$.ajax({
		url: httpUrl,
		type: httpType,
		async: async,
		data: httpParam,
		contentType: "application/json;charset=UTF-8",
		dataType: 'json',
		success: function(msg) {
			if(msg.result == 99) {
				alert(msg.message);
				return false;
			}
			reqResult = msg;
			return msg;
		},
		error: function(data) {
			/**
			 * 此处应为弹出公共提示信息窗口 提示错误信息 并返回登录页面
			 * 
			 * window.location.href = 'http://192.168.0.200/org/login.html'; return false;
			 */
		}
	});
	return reqResult;
}


var orderIp = 'http://192.168.1.200';
function getCode(imgs){
	$(imgs).attr('src',orderIp+'/br-order-user-controller/authImageController/verifyCode'+'?'+Math.random());
}
//分页当前页码
var page_curr = 1;
// 每页记录条数
var count_curr = 12;
// 记录总条数
var total_count = 0;
// limit
var limit = 12;

function callBackPagination(dataBack) {
	var totalCount = dataBack.data.total;
	var showCount = 5;
	var limit = 12;
	createTable(1, limit, totalCount, dataBack);
}
function callBackPaginationInit(dataBack) {
		var totalCount = dataBack.data.total,
			showCount = 5,
			limit = 12;
		createTable(1, limit, totalCount, dataBack);
		$('#callBackPager').extendPagination({
			totalCount: totalCount,
			showCount: showCount,
			limit: limit,
			callback: function(curr, limit, totalCount, dataBack) {
				createTable(curr, limit, totalCount, dataBack);
			}
		});
}

//首页展示
var showUserFirstDataUrl = orderIp+'/br-order-user-controller/userFirstData/showUserFirstData'; //门店套餐列表展示
var searchSuiteUrl = orderIp+'/br-order-user-controller/searchData/searchSuite'; //分页搜索套餐列表
var searchBranchUrl = orderIp+'/br-order-user-controller/searchData/searchBranch'; //分页搜索门店列表

//轮播图
var index_showUserFirstImgData_url=orderIp+'/br-order-user-controller/userFirstImgData/showUserFirstImgData'; //轮播图

//套餐分页面
var getOrglevelUrl = orderIp+'/br-order-user-controller/orglevel/orglevel'; //医院等级信息展示
var getsuitetypeUrl = orderIp+'/br-order-user-controller/suitetype/suitetype'; //套餐类型信息展示
var getHidDiseasesUrl = orderIp+'/br-order-user-controller/hid/hid'; //高发疾病信息展示
var getOrgNameAllUrl = orderIp+'/br-order-user-controller/org/list'; //机构名称信息展示
//门店分页面
var getAllProvinceUrl= orderIp+'/br-order-user-controller/area/province';//获取省
var getCityByProvinceIdUrl= orderIp+'/br-order-user-controller/area/city';//获取市
var getDistrictByCityIdUrl = orderIp+'/br-order-user-controller/area/district'; //获取区
var getOrgTypeUrl = orderIp+'/br-order-user-controller/org/type'; //机构类型信息展示
//用户注册
var customerInfondVerifyCodeUrl=orderIp+'/br-order-user-controller/customerInfo/sendVerifyCode';//发送验证码
var insertCustomerRegistUrl=orderIp+'/br-order-user-controller/customersRegist/insertCustomerRegist';//注册
var checkCustomerInfoByInfoUrl=orderIp+'/br-order-user-controller/customerInfo/checkCustomerRegister';//验证用户名是否注册
var validateCodeUrl=orderIp+'/br-order-user-controller/customersRegist/validateCode';//校验手机验证码
//用户登录
var verifyCodeUrl=orderIp+'/br-order-user-controller/authImageController/verifyCode';//获取验证码
var imgValidateCodeUrl=orderIp+'/br-order-user-controller/authImageController/validateCode';//校验图片验证码
var customerInfoLoginUrl=orderIp+'/br-order-user-controller/login/customerInfoLogin';//用户登录
//企业注册
var insertEnterpriseUrl=orderIp+'/br-order-user-controller/enterprise/insertEnterprise';//注册
var enterpriseLoginUrl=orderIp+'/br-order-user-controller/login/enterpriseLogin';//登录
//企业消费记录
var enterpriseConsumeRecordUrl=orderIp+'/br-order-user-controller/payInfoEp/getPayInfoByPage';//企业消费记录
//企业订单中心列表
var getCustomerOrderByPageUrl=orderIp+'/br-order-user-controller/cusOrderEp/getCustomerOrderByPage';//展示列表
var getCustomerOrderUrl=orderIp+'/br-order-user-controller/cusOrderEp/getCustomerOrder';//查看列表
//个人亲友
var getCustomerInfoByPageUrl=orderIp+'/br-order-user-controller/relationship/getCustomerInfoByPage';//展示亲友列表
var getRelationshipByIDUrl=orderIp+'/br-order-user-controller/relationship/getRelationshipByID';//根据id查询家庭成员的详细信息
var deleteRelationshipUrl=orderIp+'/br-order-user-controller/relationship/deleteRelationship';//删除家庭关系信息
var updateRelationshipUrl=orderIp+'/br-order-user-controller/relationship/updateRelationship';//修改家庭成员的信息
var getValidRelationshipUrl=orderIp+'/br-order-user-controller/rs/list';//获取有效的关系列表
var insertRelationshipUrl=orderIp+'/br-order-user-controller/relationship/insertRelationship';//增加家庭成员
//个人资料
var getCustomerInfoByIdUrl=orderIp+'/br-order-user-controller/customerInfo/getCustomerInfoById';//展示个人详情
var updateCustomerInfoUrl=orderIp+'/br-order-user-controller/customerInfo/updateCustomerInfo';//编辑保存个人详情
//修改手机号
var checkPhoneByInfo=orderIp+'/br-order-user-controller/customerInfo/checkCustomerInfoByInfo';//手机号校验
var updateCustomerInfoPhoneUrl=orderIp+'/br-order-user-controller/customerInfo/updateCustomerInfoPhone';//修改手机号
//修改密码
var updateCustomerRegistPasswordUrl=orderIp+'/br-order-user-controller/customerInfo/updateCustomerRegistPassword';//修改密码
//修改邮箱
var updateCustomerInfoEmailUrl=orderIp+'/br-order-user-controller/customerInfo/updateCustomerInfoEmail';//修改邮箱
//详情页
var getBranchInfo=orderIp+'/br-order-user-controller/infodetail/showBranchInfoDetail';//获取门店详情页
var getSuiteInfo=orderIp+'/br-order-user-controller/infodetail/showSuiteInfoDetail';//获取套餐详情页
var getThreshold=orderIp+'/br-order-user-controller/customerCart/getThreshold';//获取套餐剩余量信息
var getBranchBySuiteId=orderIp+'/br-order-user-controller/infodetail/getOrgBranchBySuiteId';//根据套餐查看门店

//企业信息
//部门信息
var departmentInfo_getEnterpriseDepTree_url=orderIp+'/br-order-user-controller/enterpriseDep/getEnterpriseDepTree'; //获取部门权限树
var departmentInfo_getEnterpriseDepList_url=orderIp+'/br-order-user-controller/enterpriseDep/getEnterpriseDepList';//获取部门上级菜单
var departmentInfo_insertEnterpriseDep_url=orderIp+'/br-order-user-controller/enterpriseDep/insertEnterpriseDep'; //新增节点信息
var departmentInfo_checkDeptName_url=orderIp+'/br-order-user-controller/enterpriseDep/checkDeptName'; //企业部门重名校验
var departmentInfo_updateEnterpriseDep_url=orderIp+'/br-order-user-controller/enterpriseDep/updateEnterpriseDep'; //企业部门修改
var departmentInfo_deleteEnterpriseDep_url=orderIp+'/br-order-user-controller/enterpriseDep/deleteEnterpriseDep';//删除部门信息
//员工信息
var staffInfo_getAllEnterpriseEmpByPage_url=orderIp+'/br-order-user-controller/enterpriseEmp/getAllEnterpriseEmpByPage'; //获取员工列表信息
var staffInfo_insertEnterpriseEmp_url=orderIp+'/br-order-user-controller/enterpriseEmp/insertEnterpriseEmp';//添加部门员工
var staffInfo_deleteEnterpriseEmp_url=orderIp+'/br-order-user-controller/enterpriseEmp/deleteEnterpriseEmp';//删除部门员工
var staffInfo_getEnterpriseEmp_url=orderIp+'/br-order-user-controller/enterpriseEmp/getEnterpriseEmp';//查看部门员工
var staffInfo_updateCustomerInfo_url=orderIp+'/br-order-user-controller/customerInfo/updateCustomerInfo';//编辑保存部门员工
var staffInfo_updateEnterpriseEmp_url=orderIp+'/br-order-user-controller/enterpriseEmp/updateEnterpriseEmp'; //修改保存员工所属部门
//企业资料
var getEnterpriseListUrl = orderIp+'/br-order-user-controller/enterprise/getEnterpriseById';//获取企业资料列表
var updateEnterpriseUrl = orderIp+'/br-order-user-controller/enterprise/updateEnterprise';//编辑企业资料
//个人信息
//个人
var orderList_getCustomerOrderByPage_url=orderIp+'/br-order-user-controller/cusOrderCus/getCustomerOrderByPage'; //个人订单
var orderList_getCustomerOrder_url=orderIp+'/br-order-user-controller/cusOrderCus/getCustomerOrder'; //查看订单信息

var orderList_getCustomerOrderPayInfoByPage_url=orderIp+'/br-order-user-controller/customerOrderPayInfoCustomer/getCustomerOrderPayInfoByPage'; //个人订单

//消费记录
var recordsOfConsumption_getCustomerOrderPayInfoByPage_url=orderIp+'/br-order-user-controller/payInfoCus/getPayInfoByPage';// 消费记录
var recordsOfConsumption_getCustomerOrderPayInfo_url=orderIp+'/br-order-user-controller/payInfoCus/getPayInfo'; //查看消费信息

//支付状态
var payfor_getCustomerOrderList_url=orderIp+'/br-order-user-controller/customerOrderStatus/getCustomerOrderStatusList';//支付状态
//购物车
var getCustomerCartByePageUrl=orderIp+'/br-order-user-controller/customerCart/getCustomerCartByePage';//查询购物车
var delectCustomerCartUrl=orderIp+'/br-order-user-controller/customerCart/delectCustomerCart';//删除购物车
var getCustomerCartByIdUrl=orderIp+'/br-order-user-controller/customerCart/getCustomerCartById';//购物车查看
var customer_cart_add=orderIp+'/br-order-user-controller/customerCart/insertToCustomerCart';//添加购物车
var addCustomerOrderUrl=orderIp+'/br-order-user-controller/cusOrderCus/addCustomerOrder';//提交订单
var loginOutUrl=orderIp+'/br-order-user-controller/login/loginOut';//购物车退出
var receiptTypeUrl=orderIp+'/br-order-user-controller/cusOrderCus/getReceiptList';//发票类型

//性别信息
var dictSexListByStatus_url=orderIp+'/br-order-user-controller/sex/list';//获取性别信息

//个人订单信息
var getParametersBycustomerIdUrl =orderIp+'/br-order-user-controller/cusOrderCus/getParameters';//根据用户id查询机构、门店、套餐

var gwIp='http://114.215.222.233';
//微信支付接口
var weixinPayUrl=gwIp+'/br-order-user-controller/cusOrderCus/createQRCode';//微信支付二维码
var getOrderStateUrl=gwIp+'/br-order-user-controller/cusOrderCus/getOrderState';//定时器请求支付状态接口
//支付宝支付接口
var alipayUrl = gwIp+'/br-order-user-controller/alipay/payOrder';//支付宝支付二维码
var getPayResultUrl = gwIp+'/br-order-user-controller/payResult/getPayResult';//支付宝接口回调通知

//微信退款
var weixinRefundUrl = gwIp+'/br-order-user-controller/cusOrderCus/refund_order';
//支付成功页面数据展示
var getCustomerOrderByOrderNoUrl = gwIp+'/br-order-user-controller/cusOrderCus/getAllByOrderNo';//根据订单号查询订单详情内容，并在支付成功后展示
//首页城市定位
var positioncityUrl = orderIp+'/br-order-user-controller/area/positioncity';//获取全部城市信息
//表格信息导入
var customerImportUrl = orderIp+ 'br-order-user-controller/customerInfo/import';//员工导入
var enterpriseImportUrl = orderIp+ 'br-order-user-controller/enterpriseDep/import';//部门导入
