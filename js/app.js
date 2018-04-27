var app = angular.module('app', []).controller('appCtrl', function($scope, commonService, $http) {

	(function() {

		$scope.view;
		//use array to store the input
		$scope.input = [];

		//read from $scope.input, then display
		function view() {
			$scope.view = $scope.input.join("");
			$scope.$apply();
		}

		//syntaxErrorCode
		function syntaxErrorCode(code) {
			alert(code);
		}

		function syntaxError() {
			alert("incorrect input, please enter again");
		}

		//Start to calculate
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
		
		//^2
		document.querySelector('#signSquare').onclick = signSquare;

		function signSquare() {
			$scope.input.push("^");
			$scope.input.push("2");
			view();
		}

		//^3
		document.querySelector('#signCube').onclick = signCube;

		function signCube() {
			$scope.input.push("^");
			$scope.input.push("3");
			view();
		}

		//^y
		document.querySelector('#signExpY').onclick = signExpY;

		function signExpY() {
			$scope.input.push("^");
			view();
		}
		
		//√
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
			//delete from index=0
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

		//'.'
		document.querySelector('#signDot').onclick = signDot;

		function signDot() {
			$scope.input.push(".");
			view();
		}
		
		
		//change π and e into real number (for next step)
		function constantReplace() {
			for(var c = 0; $scope.input.length > c; c++) {
				if(!isNaN($scope.input[c]) && $scope.input[c + 1] == "π") {
					$scope.input.splice(c + 1, 1, "*", "3.1415926");
				}

				if(!isNaN($scope.input[c + 1]) && $scope.input[c] == "π") {
					syntaxErrorCode("You can't put a number after π");
					return false;
				}
				if($scope.input[c] == "π") {
					$scope.input.splice(c, 1, "3.1415926");
				}
				if($scope.input[c] == "e" && !isNaN($scope.input[c + 1])) {
					syntaxErrorCode("You can't put a number after e");
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
		

		//syntax testing: return boolean
		function syntaxTest() {

			//$scope.input should not be empty
			if($scope.input.length == 0) {
				return false;
			}
			//* / + - should not at the first place 
			if($scope.input[0] == "*" || $scope.input[0] == "/" || $scope.input[0] == "%" ||  $scope.input[0] == "^") {
				syntaxErrorCode($scope.input[0] + " can't be put at the beginning!");
				return false;
			}
			
			//+ - * / should not at the end
			if($scope.input[$scope.input.length - 1] == "+" || $scope.input[$scope.input.length - 1] == "-" || $scope.input[$scope.input.length - 1] == "*" || $scope.input[$scope.input.length - 1] == "/" || $scope.input[$scope.input.length - 1] == "√" || $scope.input[$scope.input.length - 1] == "^") {
				syntaxErrorCode($scope.input[$scope.input.length - 1] + "should not at the end");
				return false;
			}
			//+ - . followed with a number
			if($scope.input[0] == "+" || $scope.input[0] == "-" || $scope.input[0] == ".") {
				//add a '0' at the first place if start with '+' or '-'
				$scope.input.splice(0, 0, "0");
			}

			for(var j = 0; $scope.input.length > j; j++) {
				//change ++ to +, +- to -, -- to +, -+ to -
				//-- => + 
				if($scope.input[j] == "-" && $scope.input[j + 1] == "-") {
					$scope.input.splice(j, 1, "+");
					$scope.input.splice(j + 1, 1);
				}
				//-+ => - 
				if($scope.input[j] == "-" && $scope.input[j + 1] == "+") {
					$scope.input.splice(j + 1, 1);
				}
				//++ => + 
				if($scope.input[j] == "+" && $scope.input[j + 1] == "+") {
					$scope.input.splice(j + 1, 1);
				}
				//+- => - 
				if($scope.input[j] == "+" && $scope.input[j + 1] == "-") {
					$scope.input.splice(j, 1);
				}

				//when entering '+.1', calculate '+0.1'
				if($scope.input[j] == "." && !isNaN($scope.input[j + 1]) && isNaN($scope.input[j - 1])) {
					$scope.input.splice(j, 0, "0");
				}
				
			}

			for(var i = 0; i < $scope.input.length; i++) {
				//forbid / * combinition
				if(($scope.input[i] == "*" || $scope.input[i] == "/" || $scope.input[i] == "^" || $scope.input[i] == "+" || $scope.input[i] == "-") && ($scope.input[i + 1] == "*" || $scope.input[i + 1] == "/" || $scope.input[i + 1] == "^" || $scope.input[i + 1] == ")")) {
					syntaxErrorCode("input not correct");
					return false;
				}	
			}			
			return true;
		}

		//Combine numbers
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

		//use '.' to generate double
		function dotCombine() {
			while($scope.input.indexOf(".") != -1) {
				var dotPosition = $scope.input.indexOf(".");
				var dotNumber = $scope.input[dotPosition - 1] + $scope.input[dotPosition] + $scope.input[dotPosition + 1];
				$scope.input.splice(dotPosition, 2);
				$scope.input[dotPosition - 1] = parseFloat(dotNumber);
			}
		}

		//implement ^
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
		//trigonometric functions，log and ln
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

		//* and /
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

		//+ and -
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

		//calculate for segment
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

		//final calculate
		function calculation() {
			//if $scope.input only has one element, then finish
			while($scope.input.length != 1) {
				segmentCalcute($scope.input);
			}
		}

		//RESULT
		function result() {
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
		document.querySelector('#result').onclick = result;

	})();

});
app.service('commonService', function() {

})