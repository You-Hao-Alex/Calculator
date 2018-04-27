var app = angular.module('app', []).controller('appCtrl', function($scope, commonService, $http) {

	(function() {

		$scope.view;
		//将输入的代运算添加为数组-全局变量 OK
		$scope.input = [];

		//读取$scope.input信息并显示 OK
		function view() {
			$scope.view = $scope.input.join("");
			$scope.$apply();
		}

		//syntaxErrorCode显示 OK
		function syntaxErrorCode(code) {
			alert(code);
		}

		function syntaxError() {
			alert("输入的语法错误，请修改！");
		}

		//  计算开始
		//GET SIGN
		//+
		document.querySelector('#signPlus').onclick = signPlus;

		function signPlus() {
			$scope.input.push("+");
			view();
		}
		//-
		document.querySelector('#signMinus').onclick = signMinus;

		function signMinus() {
			$scope.input.push("-");
			view();
		}
		//*
		document.querySelector('#signMult').onclick = signMult;

		function signMult() {
			$scope.input.push("*");
			view();
		}
		// /
		document.querySelector('#signDiv').onclick = signDiv;

		function signDiv() {
			$scope.input.push("/");
			view();
		}
		//()
//		document.querySelector('#signParL').onclick = signParL;
//
//		function signParL() {
//			$scope.input.push("(");
//			view();
//		}
//
//		document.querySelector('#signParR').onclick = signParR;
//
//		function signParR() {
//			$scope.input.push(")");
//			view();
//		}
		//  1/x

		document.querySelector('#signSquare').onclick = signSquare;

		function signSquare() {
			$scope.input.push("^");
			$scope.input.push("2");
			view();
		}

		document.querySelector('#signCube').onclick = signCube;

		function signCube() {
			$scope.input.push("^");
			$scope.input.push("3");
			view();
		}

		document.querySelector('#signExpY').onclick = signExpY;

		function signExpY() {
			$scope.input.push("^");
			//$scope.input.push("(");
			view();
		}
		
		document.querySelector('#sqrt').onclick = sqrt;

		function sqrt() {
			$scope.input.push("√");
				view();
		}
		
		//Del
		document.querySelector('#signDel').onclick = signDel;

		function signDel() {
			//取出一个
			$scope.input.pop();
			view();
		}
		//C
		document.querySelector('#reset').onclick = reset;

		function reset() {
			//从index=0开始删除==清空
			$scope.input.splice(0);
			view();
		}
		//NUMBER
		document.querySelector('#num0').onclick = num0;

		function num0() {
			$scope.input.push("0");
			view();
		}

		document.querySelector('#num1').onclick = num1;

		function num1() {
			$scope.input.push("1");
			view();
		}

		document.querySelector('#num2').onclick = num2;

		function num2() {
			$scope.input.push("2");
			view();
		}

		document.querySelector('#num3').onclick = num3;

		function num3() {
			$scope.input.push("3");
			view();
		}

		document.querySelector('#num4').onclick = num4;

		function num4() {
			$scope.input.push("4");
			view();
		}

		document.querySelector('#num5').onclick = num5;

		function num5() {
			$scope.input.push("5");
			view();
		}

		document.querySelector('#num6').onclick = num6;

		function num6() {
			$scope.input.push("6");
			view();
		}

		document.querySelector('#num7').onclick = num7;

		function num7() {
			$scope.input.push("7");
			view();
		}

		document.querySelector('#num8').onclick = num8;

		function num8() {
			$scope.input.push("8");
			view();
		}

		document.querySelector('#num9').onclick = num9;

		function num9() {
			$scope.input.push("9");
			view();
		}
		//DOT
		document.querySelector('#signDot').onclick = signDot;

		function signDot() {
			$scope.input.push(".");
			view();
		}

		//常量替换 π e OK
		function constantReplace() {
			//    alert("进入常数替换");
			for(var c = 0; $scope.input.length > c; c++) {
				if(!isNaN($scope.input[c]) && $scope.input[c + 1] == "π") {
					$scope.input.splice(c + 1, 1, "*", "3.1415926");
				}

				if(!isNaN($scope.input[c + 1]) && $scope.input[c] == "π") {
					syntaxErrorCode("π 后面有数字，无法计算~~");
					return false;
				}
				if($scope.input[c] == "π") {
					$scope.input.splice(c, 1, "3.1415926");
				}
				if($scope.input[c] == "e" && !isNaN($scope.input[c + 1])) {
					syntaxErrorCode("e 后面有数字，无法计算~~");
					return false;
				}
				if(!isNaN($scope.input[c]) && $scope.input[c + 1] == "e") {
					$scope.input.splice(c + 1, 1, "*", "2.718281828");
				}
				if($scope.input[c] == "e") {
					$scope.input.splice(c, 1, "2.718281828");
				}
			}
			return true;
		}

		//语法检查 return boolean
		function syntaxTest() {

			//$scope.input不能为空，但不是错 ok
			if($scope.input.length == 0) {
				return false;
			}
			//首元素不能是* / % ) exp符号 ok
			if($scope.input[0] == "*" || $scope.input[0] == "/" || $scope.input[0] == "%" || $scope.input[0] == ")" || $scope.input[0] == "^") {
				syntaxErrorCode("把 " + $scope.input[0] + " 放在前面怎么计算啊~");
				return false;
			}
			
			//尾部不能是+ - * / ( 符号 OK
			if($scope.input[$scope.input.length - 1] == "+" || $scope.input[$scope.input.length - 1] == "-" || $scope.input[$scope.input.length - 1] == "*" || $scope.input[$scope.input.length - 1] == "/" || $scope.input[$scope.input.length - 1] == "(") {
				syntaxErrorCode("把" + $scope.input[$scope.input.length - 1] + "放在末尾搞毛线~");
				return false;
			}
			//+ - .后面是数字的情况（首元素） OK
			if($scope.input[0] == "+" || $scope.input[0] == "-" || $scope.input[0] == ".") {
				//第一个为正负号且下一个是数字，则在第一个元素添加0
				$scope.input.splice(0, 0, "0");
			}

			for(var j = 0; $scope.input.length > j; j++) {
				//对加法减法运算符重复出现的情况，进行简化（后面的元素 -- ++ -+ +-）
				//-- => + OK
				if($scope.input[j] == "-" && $scope.input[j + 1] == "-") {
					$scope.input.splice(j, 1, "+");
					$scope.input.splice(j + 1, 1);
				}
				//-+ => - OK
				if($scope.input[j] == "-" && $scope.input[j + 1] == "+") {
					$scope.input.splice(j + 1, 1);
				}
				//++ => + OK
				if($scope.input[j] == "+" && $scope.input[j + 1] == "+") {
					$scope.input.splice(j + 1, 1);
				}
				//+- => - OK
				if($scope.input[j] == "+" && $scope.input[j + 1] == "-") {
					$scope.input.splice(j, 1);
				}

				//(.2   ).2的情况排除  OK
				if(($scope.input[j] == "(" || $scope.input[j] == ")") && $scope.input[j + 1] == ".") {
					syntaxErrorCode("(.这样的运算我不知道什么意思哦~");
					return false;
				}

				//对于+.2的情况，在前面加上0  +0.2
				if($scope.input[j] == "." && !isNaN($scope.input[j + 1]) && isNaN($scope.input[j - 1])) {
					$scope.input.splice(j, 0, "0");
				}

				//三角函数 log ln 先后判断3sin=3*sin
				if(($scope.input[j + 1] == "sin" || $scope.input[j + 1] == "cos" || $scope.input[j + 1] == "tan" || $scope.input[j + 1] == "cot" || $scope.input[j + 1] == "log" || $scope.input[j + 1] == "ln") && !isNaN($scope.input[j])) {
					$scope.input.splice(j + 1, 0, "*");
				}
			}
			//三角函数后面只能跟（或者数字
			if(($scope.input[j] == "sin" || $scope.input[j] == "√" || $scope.input[j] == "cos" || $scope.input[j] == "tan" || $scope.input[j] == "cot" || $scope.input[j] == "log" || $scope.input[j] == "ln") && ($scope.input[j + 1] != "(" || isNaN($scope.input[j + 1]))) {
				syntaxErrorCode("我看不懂这个，" + $scope.input[j] + $scope.input[j + 1]);
				return false;
			}

			

			var left = 0;
			var right = 0;
			for(var i = 0; i < $scope.input.length; i++) {
				//forbidden / * exp ( 组合
				if(($scope.input[i] == "*" || $scope.input[i] == "/" || $scope.input[i] == "^" || $scope.input[i] == "(" || $scope.input[i] == "+" || $scope.input[i] == "-") && ($scope.input[i + 1] == "*" || $scope.input[i + 1] == "/" || $scope.input[i + 1] == "^" || $scope.input[i + 1] == ")")) {
					syntaxErrorCode("你确定要这么写吗？ ……" + $scope.input[i] + $scope.input[i + 1] + "……");
					return false;
				}
				//(+  (-的情况,改为（0+1 （0-1
				if($scope.input[i] == "(" && ($scope.input[i + 1] == "-" || $scope.input[i + 1] == "+")) {
					$scope.input.splice(i + 1, 0, "0");
				}
				//括号统计
				if($scope.input[i] == "(") {

					left++;
				}
				if($scope.input[i] == ")") {
					right++;
				}
			}

			if(left != right) {
				syntaxErrorCode("左右括号数量不一致，你再检查下！");
				return false;
			}
			return true;
		}

		//数字合并 OK
		function numberCombine() {
			for(var i = 0; $scope.input.length > i; i++) {
				while($scope.input.length > i) {
					if(!isNaN($scope.input[i])) {
						if(!isNaN($scope.input[i + 1])) {
							$scope.input[i] = $scope.input[i] + $scope.input[i + 1];
							$scope.input.splice(i + 1, 1);
						} else {
							i++;
							break;
						}
					} else {
						break;
					}
				}
			}
		}

		//点合并，小数 OK
		function dotCombine() {
			while($scope.input.indexOf(".") != -1) {
				var dotPosition = $scope.input.indexOf(".");
				var dotNumber = $scope.input[dotPosition - 1] + $scope.input[dotPosition] + $scope.input[dotPosition + 1];
				$scope.input.splice(dotPosition, 2);
				$scope.input[dotPosition - 1] = parseFloat(dotNumber);
			}
		}

		//幂运算
		function Pow(segment) {
			while(segment.indexOf("^") != -1) {
				segment[segment.indexOf("^") - 1] = Math.pow(parseFloat(segment[segment.indexOf("^") - 1]), parseFloat(segment[segment.indexOf("^") + 1]));
				segment.splice(segment.indexOf("^"), 2);
			}
		}
		function Sqrt(segment){
			while(segment.indexOf("√") != -1) {
				segment[segment.indexOf("√") + 1] = Math.pow(parseFloat(segment[segment.indexOf("√") + 1]),1/2);
				segment.splice(segment.indexOf("√"), 1);
			}
			
		}
		//三角函数方法，log，ln方法
		function Sin(segment) {
			while(segment.indexOf("sin") != -1) {
				segment[segment.indexOf("sin") + 1] = Math.sin(parseFloat(segment[segment.indexOf("sin") + 1]));
				segment.splice(segment.indexOf("sin"), 1);
			}
		}

		function Cos(segment) {
			while(segment.indexOf("cos") != -1) {
				segment[segment.indexOf("cos") + 1] = Math.cos(parseFloat(segment[segment.indexOf("cos") + 1]));
				segment.splice(segment.indexOf("cos"), 1);
			}
		}

		function Tan(segment) {
			while(segment.indexOf("tan") != -1) {
				segment[segment.indexOf("tan") + 1] = Math.tan(parseFloat(segment[segment.indexOf("tan") + 1]));
				segment.splice(segment.indexOf("tan"), 1);
			}
		}

		function Cot(segment) {
			while(segment.indexOf("cot") != -1) {
				segment[segment.indexOf("cot") + 1] = 1 / (Math.tan(parseFloat(segment[segment.indexOf("cot") + 1])));
				segment.splice(segment.indexOf("cot"), 1);
			}
		}

		function Log(segment) {
			while(segment.indexOf("log") != -1) {
				segment[segment.indexOf("log") + 1] = Math.log(parseFloat(segment[segment.indexOf("log") + 1])) / Math.LN10;
				segment.splice(segment.indexOf("log"), 1);
			}
		}

		function Ln(segment) {
			while(segment.indexOf("ln") != -1) {
				segment[segment.indexOf("ln") + 1] = Math.log(parseFloat(segment[segment.indexOf("ln") + 1]));
				segment.splice(segment.indexOf("ln"), 1);
			}
		}

		//乘除运算
		function MulDiv(segment) {
			while(segment.indexOf("*") != -1 || segment.indexOf("/") != -1) {
				if(segment.indexOf("*") != -1) {
					segment[segment.indexOf("*") - 1] = parseFloat(segment[segment.indexOf("*") - 1]) * parseFloat(segment[segment.indexOf("*") + 1]);
					segment.splice(segment.indexOf("*"), 2);
				} else {
					segment[segment.indexOf("/") - 1] = parseFloat(segment[segment.indexOf("/") - 1]) / parseFloat(segment[segment.indexOf("/") + 1]);
					segment.splice(segment.indexOf("/"), 2);
				}
			}
		}

		//加减运算
		function AddSub(segment) {
			while(segment.indexOf("-") != -1 || segment.indexOf("+") != -1) {
				if(segment.indexOf("-") != -1) {
					segment[segment.indexOf("-") - 1] = parseFloat(segment[segment.indexOf("-") - 1]) - parseFloat(segment[segment.indexOf("-") + 1]);
					segment.splice(segment.indexOf("-"), 2);
				} else {
					segment[segment.indexOf("+") - 1] = parseFloat(segment[segment.indexOf("+") - 1]) + parseFloat(segment[segment.indexOf("+") + 1]);
					segment.splice(segment.indexOf("+"), 2);
				}
			}
		}

		//给定片段进行计算，不包括（）
		function segmentCalcute(segment) {
			while(segment.length != 1) {
				Sin(segment);
				Cos(segment);
				Tan(segment);
				Cot(segment);
				Log(segment);
				Ln(segment);
				Pow(segment);
				Sqrt(segment);
				MulDiv(segment);
				AddSub(segment);
			}
		}

		//最终运算
		function calculation() {
			var leftStart;
			var rightStop;
			//如果$scope.input只有一个元素代表计算完毕
			while($scope.input.length != 1) {
				//对于有括号的情况，找到左右括号位置 ，并计算
				while($scope.input.lastIndexOf("(") != -1) {
					//找到左右括号位置
					leftStart = $scope.input.lastIndexOf("(");
					for(; $scope.input.length > leftStart; leftStart++) {
						if($scope.input[leftStart] == ")") {
							rightStop = leftStart;
							break;
						}
					}
					leftStart = $scope.input.lastIndexOf("(");
					var segment = $scope.input.slice(leftStart + 1, rightStop);
					$scope.input.splice(leftStart + 1, rightStop - leftStart);
					//            进行计算，输入最小可计算片段
					segmentCalcute(segment);
					$scope.input[leftStart] = segment[0];
				}
				//进行最后没有括号的运算
				segmentCalcute($scope.input);
			}
		}

		//RESULT
		function result() {
			//常量替换
			if(!constantReplace()) {
				return;
			}
			if(!syntaxTest()) {
				//alert("syntaxTest-error");
				return;
			}
			numberCombine();
			dotCombine();
			calculation();
			view();
		}
		//事件触发
		document.querySelector('#result').onclick = result;

	})();

});
app.service('commonService', function() {

})