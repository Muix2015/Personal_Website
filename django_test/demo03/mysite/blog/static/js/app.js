
$("#clk-btn").click(function(){
    var postDate = calculate();
    $.ajax({
        url:"http://127.0.0.1:8000/result",
        type:"POST",
        // data: postDate,
        data: {"a":1, "b":2},
        dataType:'JSON',
        success: function (data) {
            alert(data)
            alert("请求成功")
        },
        error: function () {
            alert("服务器请求超时，请重试!")
        }
    });

    // console.log(postDate);
});

function calculate() {
    var principal = document.getElementById('principal');
    var rate = document.getElementById('rate');
    var period = document.getElementById('period');
    var paymentMethod = document.getElementById('payment-method');

    var principalVal = parseFloat(principal.value);
    var rateVal = parseFloat(rate.value) / 100 / 12;
    var periodVal = parseFloat(period.value);
    var paymentMethodVal = paymentMethod.value;
    
    var result;
    if (paymentMethodVal == "method1") {
        result = paymentMethod1(principalVal, rateVal, periodVal);
    } else if (paymentMethodVal == "method2") {
        result = paymentMethod2(principalVal, rateVal, periodVal);
    } else {
        alert("请选择正确的还款方式！");
    }
    
    return result;
    // console.log(result);
}

function paymentMethod1(principal, rate, period) {
    // 等额本息还款方案
    var monthlyPayment = (principal * rate * (1 + rate) ** period) / ((1 + rate) ** period - 1);
    var result = {"totalPayment":0, "totalInterest":0, "monthly":[]};
    result["totalPayment"] = monthlyPayment * period;
    result["totalInterest"] = result["totalPayment"] - principal;
    var monthlyPrincipal, monthlyInterest;
    for (i=1; i<period+1; i++) {
        monthlyPrincipal = principal * rate * (1 + rate) ** (i - 1)/ ((1 + rate) ** period -1);
        monthlyInterest = monthlyPayment - monthlyPrincipal;
        result["monthly"].push([i, monthlyPayment, monthlyPrincipal, monthlyInterest]);
    }
    var jsonResult = JSON.stringify(result);
    return jsonResult;
}

function paymentMethod2(principal, rate, period) {
    // 等额本金还款方案
    var monthlyPrincipal = principal / period;
    var result = {"totalPayment":0, "totalInterest":0, "monthly":[]};
    var monthlyPrincipal, monthlyInterest;
    for (i=1; i<period+1; i++) {
        monthlyInterest = principal * (1 - (i-1)/period) * rate;
        monthlyPayment = monthlyPrincipal + monthlyInterest;
        result["totalInterest"] += monthlyInterest;
        result["totalPayment"] += monthlyPayment;
        result["monthly"].push([i, monthlyPayment, monthlyPrincipal, monthlyInterest]);
    }
    var jsonResult = JSON.stringify(result);
    return jsonResult;
}