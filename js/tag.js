Vue.use(VueHighcharts);
var hyperbola = {
	chart: {
		height: '300px'
	},
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        spline: {
            visible: false
        }
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            format: '',
            style: {
                color: ''
            }
        }
    },
    tooltip: {
        valueSuffix: ''
    },
    legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        backgroundColor: '#FFFFFF'
    },
    series: [{
        name: '',
        color: '',
        data: []
    }, {
        name: '',
        color: '',
        data: []
    }]
};

var columnStacked = {
    chart: {
        type: 'column',
        height: 300,
        zoomType: 'x',
        panning: true,
        panKey: 'shift'
    },
    title: {
        text: '商业兴趣类uv'
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        min: 0,
        title: {
            text: null
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        x: 120,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor: '#FFFFFF'
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y + '<br/>';
        }
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                color: 'white',
                style: {
                    textShadow: '0 0 3px black'
                }
            }
        }
    },
    series: [{
        name: '',
        data: []
    }, {
        name: '',
        data: []
    }]
};

var columnBasic = {
	chart: {
        height: 300,
        zoomType: 'x',
        panning: true,
        panKey: 'shift'
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    xAxis: {
        categories: [],
        crosshair: true
    },
    yAxis: {
        title: {
            text: null
        },
        labels: {
            format:''
        }
    },
    legend: {
        layout: 'horizontal',
        align: 'left',
        x: 120,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
        backgroundColor: '#FFFFFF'
    },
    tooltip: {
        shared: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        type: 'column',
        name: '',
        color: '',
        data: []
    },{
        type: 'column',
        name: '',
        color: '',
        data: []
    }]
};


function lineCofig(obj, time){
    var config =  $.extend(true, {}, hyperbola);
    $.ajax({
        url: obj.url,
        type: 'get',
        dataType: 'json',
        data: {
            time: time
        }
    })
    .done(function(response) {
        var _data = response,
            code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
        if(code == 0){
            config.title.text = obj.title;
            config.yAxis.labels.format = '{value}';
            config.yAxis.labels.style.color = '#4F81BD';
            config.yAxis.title.text = null;
            config.tooltip.valueSuffix = '';

            config.series[0].name = obj.s_name_0;
            config.series[0].color = '#4F81BD';
            config.series[1].name = obj.s_name_1;
            config.series[1].color = '#C0504D';

            for (var i = 0, length = _data.result.length, j; i < length; i++) {
                j = length - i - 1;
                
                date[j]           = _data.result[i].data_date;
                directional[j]    = parseFloat(_data.result[i].directional_revenue);
                nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
            }

            config.xAxis.categories = date;
            config.series[0].data   = directional;
            config.series[1].data   = nonDirectional;
        }else{
            console.log(data.msg)
        }
    })
    .fail(function() {
        console.log("error");
    });
    return config;
}

// var tagBasic = function(time){
// 	var config =  $.extend(true, {}, hyperbola);
// 	$.ajax({
// 		url: './json/hyperbola.json',
// 		type: 'get',
// 		dataType: 'json',
// 		data: {
// 			time: time
// 		}
// 	})
// 	.done(function(response) {
// 		var _data = response,
//             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// 		if(code == 0){
// 			config.title.text = '基础数据变化';
// 			config.yAxis.labels.format = '{value}';
// 			config.yAxis.labels.style.color = '#4F81BD';
// 			config.yAxis.title.text = null;
// 			config.tooltip.valueSuffix = '';

// 			config.series[0].name = 'CPC增益';
// 			config.series[0].color = '#4F81BD';
// 			config.series[1].name = 'CTR增益';
// 			config.series[1].color = '#C0504D';

//             for (var i = 0, length = _data.result.length, j; i < length; i++) {
//                 j = length - i - 1;
                
//                 date[j]           = _data.result[i].data_date;
//                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
//                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
//             }

//             config.xAxis.categories = date;
//             config.series[0].data   = directional;
//             config.series[1].data   = nonDirectional;
// 		}else{
// 			console.log(data.msg)
// 		}
// 	})
// 	.fail(function() {
// 		console.log("error");
// 	});
// 	return config;
// };
// var tagBasic = lineCofig({
//     title: '基础数据变化',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// }, time);

// // var tagBustrendUV = function(time){
    
// // };
// var tagBustrendUV = lineCofig({
//     title: '商业兴趣uv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });



// // var tagBustrendPV = function(time){
// // 	var config =  $.extend(true, {}, hyperbola);
// // 	$.ajax({
// // 		url: './json/hyperbola.json',
// // 		type: 'get',
// // 		dataType: 'json',
// // 		data: {
// // 			time: time
// // 		}
// // 	})
// // 	.done(function(response) {
// // 		var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// // 		if(code == 0){
// // 			config.title.text = '商业兴趣效果pv';
// // 			config.yAxis.labels.format = '{value}';
// // 			config.yAxis.labels.style.color = '#4F81BD';
// // 			config.yAxis.title.text = null;
// // 			config.tooltip.valueSuffix = '';

// // 			config.series[0].name = 'CPC增益';
// // 			config.series[0].color = '#4F81BD';
// // 			config.series[1].name = 'CTR增益';
// // 			config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// // 		}else{
// // 			console.log(data.msg)
// // 		}
// // 	})
// // 	.fail(function() {
// // 		console.log("error");
// // 	});
// // 	return config;
// // };
// var tagBustrendPV = lineCofig({
//     title: '商业兴趣pv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagApptrendUV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果uv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };
// var tagApptrendUV = lineCofig({
//     title: 'app行为uv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagApptrendPV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果pv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };
// var tagApptrendPV = lineCofig({
//     title: 'app行为pv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagBustrendDetailUV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果uv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };

// var tagBustrendDetailUV = lineCofig({
//     title: '商业兴趣pv效果广告uv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagBustrendDetailPV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果pv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };

// var tagBustrendDetailPV = lineCofig({
//     title: '商业兴趣pv效果广告pv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagApptrendDetailUV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果uv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };

// var tagApptrendDetailUV = lineCofig({
//     title: 'app行为效果广告uv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

// // var tagApptrendDetailPV = function(time){
// //     var config =  $.extend(true, {}, hyperbola);
// //     $.ajax({
// //         url: './json/hyperbola.json',
// //         type: 'get',
// //         dataType: 'json',
// //         data: {
// //             time: time
// //         }
// //     })
// //     .done(function(response) {
// //         var _data = response,
// //             code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
// //         if(code == 0){
// //             config.title.text = '商业兴趣效果pv';
// //             config.yAxis.labels.format = '{value}';
// //             config.yAxis.labels.style.color = '#4F81BD';
// //             config.yAxis.title.text = null;
// //             config.tooltip.valueSuffix = '';

// //             config.series[0].name = 'CPC增益';
// //             config.series[0].color = '#4F81BD';
// //             config.series[1].name = 'CTR增益';
// //             config.series[1].color = '#C0504D';

// //             for (var i = 0, length = _data.result.length, j; i < length; i++) {
// //                 j = length - i - 1;
                
// //                 date[j]           = _data.result[i].data_date;
// //                 directional[j]    = parseFloat(_data.result[i].directional_revenue);
// //                 nonDirectional[j] = parseFloat(_data.result[i].non_directional_revenue);
// //             }

// //             config.xAxis.categories = date;
// //             config.series[0].data   = directional;
// //             config.series[1].data   = nonDirectional;
// //         }else{
// //             console.log(data.msg)
// //         }
// //     })
// //     .fail(function() {
// //         console.log("error");
// //     });
// //     return config;
// // };

// var tagApptrendDetailPV = lineCofig({
//     title: 'app行为效果广告pv',
//     s_name_0: 'CPC增益',
//     s_name_1: 'CTR增益',
//     url: './json/hyperbola.json'
// });

//uv，pv变化趋势

//细粒度标签寻量
var businessInterestUV = function(time){
	var config =  $.extend(true, {}, columnStacked);
	$.ajax({
		url: './json/columnstacked.json',
		type: 'get',
		dataType: 'json',
		data: {
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
		code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
		nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
		if(code == 0){
			config.title.text = '商业兴趣类uv';
			config.series[0].name = '总uv';
			config.series[0].color = '#4F81BD';

			config.series[1].name = '12355广告位uv';
			config.series[1].color = '#9BBB59';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
    console.log(config)
	return config;
};

var businessInterestPV = function(time){
	var config =  $.extend(true, {}, columnBasic);
	$.ajax({
		url: './json/columnBasic.json',
		type: 'get',
		dataType: 'json',
		data: {
			time: time
		}
	})
	.done(function(response) {
        var _data = response,
		code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
		nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
		if(code == 0){
			config.title.text = '商业兴趣类pv';
			config.series[0].name = '总pv';
			config.series[0].color = '#4F81BD';

			config.series[1].name = '12355广告位pv';
			config.series[1].color = '#C0504D';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var appUV = function(time){
	var config =  $.extend(true, {}, columnStacked);
	$.ajax({
		url: './json/columnstacked.json',
		type: 'get',
		dataType: 'json',
		data: {
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
		code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
		nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
		if(code == 0){
			config.title.text = 'app行为uv';
			config.series[0].name = '总uv';
			config.series[0].color = '#4F81BD';

			config.series[1].name = '12355广告位uv';
			config.series[1].color = '#9BBB59';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var appPV = function(time){
	var config =  $.extend(true, {}, columnBasic);
	$.ajax({
		url: './json/columnBasic.json',
		type: 'get',
		dataType: 'json',
		data: {
			time: time
		}
	})
	.done(function(response) {
        var _data = response,
		code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
		nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
		if(code == 0){
			config.title.text = 'app行为pv';
			config.series[0].name = '总pv';
			config.series[0].color = '#4F81BD';

			config.series[1].name = '12355广告位pv';
			config.series[1].color = '#C0504D';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var businessInterestDetailUV = function(time){
    var config =  $.extend(true, {}, columnStacked);
    $.ajax({
        url: './json/columnstacked.json',
        type: 'get',
        dataType: 'json',
        data: {
            time: time
        }
    })
    .done(function(response) {
        var _data = response,
        code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
        nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
        if(code == 0){
            config.title.text = '商业兴趣类效果广告uv';
            config.series[0].name = '总uv';
            config.series[0].color = '#4F81BD';

            config.series[1].name = '12355广告位uv';
            config.series[1].color = '#9BBB59';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
        }else{
            console.log(data.msg)
        }
    })
    .fail(function() {
        console.log("error");
    });
    return config;
};

var businessInterestDetailPV = function(time){
    var config =  $.extend(true, {}, columnBasic);
    $.ajax({
        url: './json/columnBasic.json',
        type: 'get',
        dataType: 'json',
        data: {
            time: time
        }
    })
    .done(function(response) {
        var _data = response,
        code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
        nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
        if(code == 0){
            config.title.text = '商业兴趣类效果广告pv';
            config.series[0].name = '总pv';
            config.series[0].color = '#4F81BD';

            config.series[1].name = '12355广告位pv';
            config.series[1].color = '#C0504D';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
        }else{
            console.log(data.msg)
        }
    })
    .fail(function() {
        console.log("error");
    });
    return config;
};

var appDetailUV = function(time){
    var config =  $.extend(true, {}, columnStacked);
    $.ajax({
        url: './json/columnstacked.json',
        type: 'get',
        dataType: 'json',
        data: {
            time: time
        }
    })
    .done(function(response) {
        var _data = response,
        code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
        nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
        if(code == 0){
            config.title.text = 'app行为效果广告uv';
            config.series[0].name = '总uv';
            config.series[0].color = '#4F81BD';

            config.series[1].name = '12355广告位uv';
            config.series[1].color = '#9BBB59';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
        }else{
            console.log(data.msg)
        }
    })
    .fail(function() {
        console.log("error");
    });
    return config;
};

var appDetailPV = function(time){
    var config =  $.extend(true, {}, columnBasic);
    $.ajax({
        url: './json/columnBasic.json',
        type: 'get',
        dataType: 'json',
        data: {
            time: time
        }
    })
    .done(function(response) {
        var _data = response,
        code = _data.code,_name = [],_value1 = [],_value2 = [],result,nameTag='',valueTag='';
        nameTag='industry_name';total='total_revenue';uv_12355='uv_12355';
        if(code == 0){
            config.title.text = 'app行为效果广告pv';
            config.series[0].name = '总pv';
            config.series[0].color = '#4F81BD';

            config.series[1].name = '12355广告位pv';
            config.series[1].color = '#C0504D';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value1[i] = parseFloat(result[i][total]);
                _value2[i] = parseFloat(result[i][uv_12355]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value1;
            config.series[1].data = _value2;
        }else{
            console.log(data.msg)
        }
    })
    .fail(function() {
        console.log("error");
    });
    return config;
};




var multiDate = moment().subtract(7, 'days').format('YYYY-MM-DD') + ' 至 ' + moment().subtract(1, 'days').format('YYYY-MM-DD');
var detailDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
var vm = new Vue({
	el: '#app',
	data: {
		filterrule: '1',
		timerange: multiDate,
        detailTimer: detailDate,
		tagBasic: lineCofig({
                    title: '基础数据变化',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
		tagBustrendUV: lineCofig({
                    title: '商业兴趣uv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
		tagBustrendPV: lineCofig({
                    title: '商业兴趣pv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagApptrendUV: lineCofig({
                    title: 'app行为uv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagApptrendPV: lineCofig({
                    title: 'app行为pv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagBustrendDetailUV: lineCofig({
                    title: '商业兴趣效果广告uv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagBustrendDetailPV: lineCofig({
                    title: '商业兴趣效果广告pv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagApptrendDetailUV: lineCofig({
                    title: 'app行为效果广告uv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        tagApptrendDetailPV: lineCofig({
                    title: 'app行为效果广告pv',
                    s_name_0: 'CPC增益',
                    s_name_1: 'CTR增益',
                    url: './json/hyperbola.json'
                }, multiDate),
        
		businessInterestUV: businessInterestUV(detailDate),
		businessInterestPV: businessInterestPV(detailDate),
		appUV: appUV(detailDate),
		appPV: appPV(detailDate),
        businessInterestDetailUV: businessInterestDetailUV(detailDate),
        businessInterestDetailPV: businessInterestDetailPV(detailDate),
        appDetailUV: appDetailUV(detailDate),
        appDetailPV: appDetailPV(detailDate),
	},
	mounted(){
     	var chart = this.$refs.highcharts.chart;
     	// console.log(chart)
		// chart.credits.update({
		// 	style: {
		// 		color: '#' + (Math.random() * 0xffffff | 0).toString(16)
		// 	}
		// });
    },
	methods: {
		query: function(event) {
			var _self = this;
			var _data = this.$data;
            _self.tagBasic            = tagBasic(_data.timerange);
            _self.tagBustrendUV       = tagBustrendUV(_data.timerange);
            _self.tagBustrendPV       = tagBustrendPV(_data.timerange);
            _self.tagApptrendUV       = tagApptrendUV(_data.timerange);
            _self.tagApptrendPV       = tagApptrendPV(_data.timerange);
            _self.tagBustrendDetailUV = tagBustrendDetailUV(_data.timerange);
            _self.tagBustrendDetailPV = tagBustrendDetailPV(_data.timerange);
            _self.tagApptrendDetailUV = tagApptrendDetailUV(_data.timerange);
            _self.tagApptrendDetailPV = tagApptrendDetailPV(_data.timerange);
		 },
         detailQuery: function(event) {
            var _self = this;
            var _data = this.$data;
            _self.businessInterestUV       = businessInterestUV(_data.detailTimer);
            _self.businessInterestPV       = businessInterestPV(_data.detailTimer);
            _self.appUV                    = appUV(_data.detailTimer);
            _self.appPV                    = appPV(_data.detailTimer);
            _self.businessInterestDetailUV = businessInterestDetailUV(_data.detailTimer);
            _self.businessInterestDetailPV = businessInterestDetailPV(_data.detailTimer);
            _self.appDetailUV              = appDetailUV(_data.detailTimer);
            _self.appDetailPV              = appDetailPV(_data.detailTimer);
         }
	},
	watch: {
		filterrule: function(newVal, oldVal){
			console.log(newVal)
		},
		timerange: function(newVal, oldVal) {
			console.log(newVal)
		}
	}
});

$('#multiDate_sum').dateRangePicker({
    language: 'cn',
    separator: ' 至 ',
    endDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    autoClose: true,
    container: 'body',
    
    getValue: function () {
        return moment().subtract(7, 'days').format('YYYY-MM-DD') + ' 至 ' + moment().subtract(1, 'days').format('YYYY-MM-DD');
    },
    
    setValue: function (s) {
        $(this).val(s);
        setTimeout(function () {
            $(this).focus();
        }, 1e2);
        vm.timerange = s;
    }
});

$('#multiDate_detail').dateRangePicker({
    language: 'cn',
    endDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    autoClose: true,
    container: 'body',
    singleDate : true,
    showShortcuts: false,
    getValue: function () {
        return moment().subtract(1, 'days').format('YYYY-MM-DD');;
    },
    
    setValue: function (s) {
        $(this).val(s);
        setTimeout(function () {
            $(this).focus();
        }, 1e2);
        vm.detailTimer = s;
    }
});

$('.filter-rule').selecter({
	callback: function(value, index) {
		vm.filterrule = value;
	}
});
