Vue.use(VueHighcharts);

var TwoYAxis = {
	chart: {
		zoomType: 'xy',
		height: '300px'
	},
	title: {
		text: ''
	},
	credits: {
		enabled: false
	},
	xAxis: [{
		categories: [],
		crosshair: true
	}],
	yAxis: [{ // Primary yAxis
		labels: {
			format: '',
			style: {
				color: ''
			}
		},
		title: {
			text: '',
			style: {
				color: ''
			}
		},
		opposite: true
	},
	{ // Secondary yAxis
		gridLineWidth: 0,
		title: {
			text: '',
			style: {
				color: ''
			}
		},
		labels: {
			format: '',
			style: {
				color: ''
			}
		}
	}],
	tooltip: {
		shared: true
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
	series: [{
		name: '',
		type: 'column',
		color: '',
		yAxis: 1,
		data: [],
		tooltip: {
			valueSuffix: ''
		}
	},
	{
		name: '',
		type: 'spline',
		color: '#',
		data: [],
		tooltip: {
			valueSuffix: ''
		}
	}]
};

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
        align: 'left',
        x: 120,
        verticalAlign: 'bottom',
        y: 20,
        floating: true,
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

var verticalColumn = {
    chart: {
        type: 'column',
		height: '300px'
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
        name: '',
        color: '',
        data: []
    }]
};

var horizontalColumn = {
    chart: {
        type: 'bar',
        height: '300px'
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: [],
        title: {
            text: null
        },
        tickLength: 0
    },
    yAxis: {
        title: {
            text: null,
            align: 'high'
        },
        labels: {
            overflow: 'justify',
        	format:''
        },
        opposite : true
    },
    tooltip: {
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: '',
        color: '',
        data: []
    }]
};

(function(){
	$.ajax({
		url: 'http://dmp.dev.chenpeng.info/api/v1/report/dev',
		type: 'post',
		dataType: 'jsonp',
		data: '',
	})
	.done(function(response) {
		alert(1)
		var directional_data = $('#directional-data').find('.color-swatches');
		$.each(directional_data, function(i, n){
			$.each(response, function(index, obj){
				if($(n).find('h4') == obj.data_name){
					$(n).find('.light').text(obj.value);
				}
			});
		});
	})
	.fail(function() {
		console.log("error");
	});
	
})();

var geoPrecent = function(filter, time){
	var config =  $.extend(true, {}, TwoYAxis);
	$.ajax({
		url: './json/geoprecent.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],revenue = [],cpc = [],result;
		if(code == 0){
			config.title.text = 'GEO定向广告数量占比和消耗占比';
			config.yAxis[0].labels.format = '{value}%';
			config.yAxis[0].labels.style.color = '#4F81BD';
			config.yAxis[0].title.text = 'geo定向广告数量占比';
			config.yAxis[0].title.style.color = '#4F81BD';



			config.yAxis[1].labels.format = '{value}%';
			config.yAxis[1].labels.style.color = '#9BBB59';
			config.yAxis[1].title.text = 'geo定向广告消耗占比';
			config.yAxis[1].title.style.color = '#9BBB59';
			config.series[0].name = 'geo定向广告消耗占比';
			config.series[0].color = '#9BBB59';
			config.series[1].name = 'geo定向广告数量占比';
			config.series[1].color = '#4F81BD';
			config.series[0].tooltip.valueSuffix = '%';
			config.series[1].tooltip.valueSuffix = '%';
			result = _data.result||[];
            for(var i=0,len=result.length,j;i<len;i++){
                j = len - i - 1;
                date[j] = result[i].data_date;
                revenue[j] = parseFloat(result[i].revenue);
                cpc[j] = parseFloat(result[i].cpc);
            }
            config.xAxis[0].categories = date ;
            config.series[0].data = revenue;
            config.series[1].data = cpc ;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var geoConsume = function(filter, time){
	var config =  $.extend(true, {}, TwoYAxis);
	$.ajax({
		url: './json/geoprecent.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],revenue = [],cpc = [],result;
		if(code == 0){
			config.title.text = 'GEO定向广告数量和消耗';
			config.yAxis[0].labels.format = '{value}';
			config.yAxis[0].labels.style.color = '#C0504D';
			config.yAxis[0].title.text = '定向广告数量';
			config.yAxis[0].title.style.color = '#C0504D';

			config.yAxis[1].labels.format = '¥{value}';
			config.yAxis[1].labels.style.color = '#C0504D';
			config.yAxis[1].title.text = '定向广告消耗';
			config.yAxis[1].title.style.color = '#C0504D';
			config.series[0].name = '定向广告消耗';
			config.series[0].color = '#C0504D';
			config.series[1].name = '定向广告占比';
			config.series[1].color = '#4F81BD';

			result = _data.result||[];
            for(var i=0,len=result.length,j;i<len;i++){
                j = len - i - 1;
                date[j] = result[i].data_date;
                revenue[j] = parseFloat(result[i].revenue);
                cpc[j] = parseFloat(result[i].cpc);
            }
            config.xAxis[0].categories = date ;
            config.series[0].data = revenue;
            config.series[1].data = cpc ;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var cpcctrUp = function(filter, time){
	var config =  $.extend(true, {}, hyperbola);
	$.ajax({
		url: './json/hyperbola.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
		if(code == 0){
			config.title.text = 'cpc，ctr增益';
			config.yAxis.labels.format = '{value}%';
			config.yAxis.labels.style.color = '#4F81BD';
			config.yAxis.title.text = null;
			config.tooltip.valueSuffix = '%';

			config.series[0].name = 'CPC增益';
			config.series[0].color = '#4F81BD';
			config.series[1].name = 'CTR增益';
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
};

var cpcCompare = function(filter, time){
	var config =  $.extend(true, {}, hyperbola);
	$.ajax({
		url: './json/hyperbola.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
		if(code == 0){
			config.title.text = '定投CPC与总体平均对比';
			config.yAxis.labels.format = '{value}';
			config.yAxis.labels.style.color = '#4F81BD';
			config.yAxis.title.text = null;
			config.tooltip.valueSuffix = '';

			config.series[0].name = 'geo定投cpc';
			config.series[0].color = '#4F81BD';
			config.series[1].name = '总体平均cpc';
			config.series[1].color = '#9BBB59';

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
};

var ctrCompare = function(filter, time){
	var config =  $.extend(true, {}, hyperbola);
	$.ajax({
		url: './json/hyperbola.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],date = [], directional = [], nonDirectional = [];
		if(code == 0){
			config.title.text = '定投CTR与总体平均对比';
			config.yAxis.labels.format = '{value}';
			config.yAxis.labels.style.color = '#4F81BD';
			config.yAxis.title.text = null;
			config.tooltip.valueSuffix = '';

			config.series[0].name = 'geo定投ctr';
			config.series[0].color = '#4F81BD';
			config.series[1].name = '总体平均ctr';
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
};

var tagTop = function(filter, time){
	var config =  $.extend(true, {}, verticalColumn);
	$.ajax({
		url: './json/verticalColumn.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
		code = _data.code,_name = [],_value = [],result,nameTag='',valueTag='';
		nameTag='industry_name';valueTag='total_revenue';
		if(code == 0){
			config.title.text = '标签使用排行榜top10';
			config.yAxis.labels.format = '{value}次数';
			config.series[0].name = '次数';
			config.series[0].color = '#4F81BD';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value[i] = parseFloat(result[i][valueTag]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var tagAdNum = function(filter, time){
	var config =  $.extend(true, {}, TwoYAxis);
	$.ajax({
		url: './json/geoprecent.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
            code = _data.code,date = [],revenue = [],cpc = [],result;
		if(code == 0){
			config.title.text = '单标签定向广告和广告主数量';

			config.yAxis[0].labels.format = '{value}';
			config.yAxis[0].labels.style.color = '#9BBB59';
			config.yAxis[0].title.text = '广告主数量';
			config.yAxis[0].title.style.color = '#9BBB59';
			
			config.yAxis[1].labels.format = '{value}';
			config.yAxis[1].labels.style.color = '#4F81BD';
			config.yAxis[1].title.text = '广告数量';
			config.yAxis[1].title.style.color = '#4F81BD';

			config.series[0].name = '广告数量';
			config.series[0].color = '#4F81BD';
			config.series[1].name = '广告主数量';
			config.series[1].color = '#9BBB59';
			result = _data.result||[];
            for(var i=0,len=result.length,j;i<len;i++){
                j = len - i - 1;
                date[j] = result[i].data_date;
                revenue[j] = parseFloat(result[i].revenue);
                cpc[j] = parseFloat(result[i].cpc);
            }
            config.xAxis[0].categories = date ;
            config.series[0].data = revenue;
            config.series[1].data = cpc ;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var adTop = function(filter, time){
	var config =  $.extend(true, {}, horizontalColumn);
	$.ajax({
		url: './json/verticalColumn.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
		code = _data.code,_name = [],_value = [],result,nameTag='',valueTag='';
		nameTag='industry_name';valueTag='total_revenue';
		if(code == 0){
			config.title.text = '广告主消耗排名top10';
			config.yAxis.labels.format = '{value}元';
			config.series[0].name = '消耗';
			config.series[0].color = '#9BBB59';
            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value[i] = parseFloat(result[i][valueTag]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value;
		}else{
			console.log(data.msg)
		}
	})
	.fail(function() {
		console.log("error");
	});
	return config;
};

var adusernum = function(filter, time){
	var config =  $.extend(true, {}, verticalColumn);
	$.ajax({
		url: './json/verticalColumn.json',
		type: 'get',
		dataType: 'json',
		data: {
			filter: filter,
			time: time
		}
	})
	.done(function(response) {
		var _data = response,
		code = _data.code,_name = [],_value = [],result,nameTag='',valueTag='';
		nameTag='industry_name';valueTag='total_revenue';
		if(code == 0){
			config.title.text = '广告主定向广告数量';
			config.yAxis.labels.format = '{value}';
			config.series[0].name = '数量';
			config.series[0].color = '#F79646';

            result = _data.result||[];
            for(var i=0,len=result.length;i<len;i++){
                _name[i] = result[i][nameTag];
                _value[i] = parseFloat(result[i][valueTag]);
            }
            config.xAxis.categories = _name;
            config.series[0].data = _value;
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
var vm = new Vue({
	el: '#app',
	data: {
		filterrule: '1',
		timerange: multiDate,
		geoPrecent: geoPrecent('1', multiDate),
		geoConsume: geoConsume('1', multiDate),
		cpcctrUp: cpcctrUp('1', multiDate),
		cpcCompare: cpcCompare('1', multiDate),
		ctrCompare: ctrCompare('1', multiDate),
		tagTop: tagTop('1', multiDate),
		adTop: adTop('1', multiDate),
		tagAdNum: tagAdNum('1', multiDate),
		adusernum: adusernum('1', multiDate)
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
		 // 	var chart = this.$refs.highcharts.chart;
			// chart.credits.update({
			// 	style: {
			// 		color: '#' + (Math.random() * 0xffffff | 0).toString(16)
			// 	}
			// });
			var _self = this;
			var _data = this.$data;
            _self.geoPrecent = geoPrecent(_data.filterrule, _data.timerange);
            _self.geoConsume = geoConsume(_data.filterrule, _data.timerange);
            _self.cpcctrUp   = cpcctrUp(_data.filterrule, _data.timerange);
            _self.cpcCompare = cpcCompare(_data.filterrule, _data.timerange);
            _self.ctrCompare = ctrCompare(_data.filterrule, _data.timerange);
            _self.tagTop     = tagTop(_data.filterrule, _data.timerange);
            _self.adTop      = adTop(_data.filterrule, _data.timerange);
            _self.tagAdNum   = tagAdNum(_data.filterrule, _data.timerange);
            _self.adusernum  = adusernum(_data.filterrule, _data.timerange);
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

$('#multiDate').dateRangePicker({
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

$('.filter-rule').selecter({
	callback: function(value, index) {
		vm.filterrule = value;
	}
});
