
$("#clk-btn").click(function(){
    var postData = calculate();
    // console.log(typeof(postData));
    var data = JSON.parse(postData);
    // console.log(data);
    showResults(data);
    // $.ajax({
    //     url:"http://127.0.0.1:8000",
    //     type:"POST",
    //     // data: postData,
    //     data: {"a":1, "b":2},
    //     dataType:'JSON',
    //     success: function (data) {
    //         alert(data)
    //         alert("请求成功")
    //     },
    //     error: function () {
    //         alert("服务器请求超时，请重试!")
    //     }
    // });

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

function showResults(data) {
    var calcRsts = document.getElementById('calc-results');
    // 清空原来的内容
    calcRsts.innerHTML = "";
    // var jsonData = JSON.parse(data);
    var rowCount = data.monthly.length;
    var colCount = data.monthly[0].length;
    // 创建表格并添加数据
    var tb = $("<table border=\"1\">");
    tb.appendTo(calcRsts);
    var tbLegend = $("<legend>还款方案结果</legend>");
    tbLegend.appendTo(tb);
    var trTotalP = $("<tr></tr>");
    trTotalP.appendTo(tb);
    ($("<td colspan=\"2\">总计还款：</td>")).appendTo(trTotalP);
    ($("<td colspan=\"2\">￥" + data.totalPayment.toFixed(2) + "</td>")).appendTo(trTotalP);
    var trTotalI = $("<tr></tr>");
    trTotalI.appendTo(tb);
    ($("<td colspan=\"2\">总计利息：</td>")).appendTo(trTotalI);
    ($("<td colspan=\"2\">￥" + data.totalInterest.toFixed(2) + "</td>")).appendTo(trTotalI);
    ($("<tr><th>期数</th><th>月供</th><th>月供本金</th><th>月供利息</th></tr>")).appendTo(tb);
    for (var i=0; i<rowCount; i++) {
        var tr = $("<tr></tr>");
        tr.appendTo(tb);

        // var tdData = data.monthly[i][j];
        // if (typeof(tdData) === 'number' && tdData%1!=0) {
        //     tdData = tdData.toFixed(2);
        // }
        // for (var j=0; j<colCount; j++) {
        //     var td = $("<td>" + tdData + "</td>");
        //     td.appendTo(tr);
        // }  

        for (var j=0; j<colCount; j++) {
            var td = $("<td>" + (data.monthly[i][j]%1==0?data.monthly[i][j]:data.monthly[i][j].toFixed(2)) + "</td>");
            td.appendTo(tr);
        }
    }
}