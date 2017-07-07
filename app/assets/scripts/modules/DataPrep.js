import $ from 'jquery';
var d3 = require("d3");
import d3TimeFormat from 'd3-time-format';

class DataPrep {
  constructor(dataJSON, time, mode){
    this.timeInt = time;
    this.mode = mode;
    this.data = this.groupDataByDate(dataJSON);
  }

  get getStats() {
    return this.data[this.data.length - 1];
  }
  
  get getChartData() {
    switch(this.mode) {
      case 'visitors':
        return this.data.map(function(x){ return {'id': x.id, 'value': x.visitors.length}});
        break;
      case 'visits':
        return this.data.map(function(x){ return {'id': x.id, 'value': x.visits}});
        break;
        
      case 'organic-search':
        return this.data.map(function(x){ return {'id': x.id, 'value': x.organic_search}});
        break;
        
      default:
        return this.data.map(function(x){ return {'id': x.id, 'value': x.pageviews}});
                       } 
  }

   prepareData(arr){
    var parseTime = d3.timeParse("%m/%d/%Y");
     return arr.map(function(d) {
      var x = $.extend(true,{},d);
      x.date = parseTime(d.date);
       return x;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  formatTime(date){
    var formatM = d3.timeFormat('%m');
    var formatW = d3.timeFormat('%W');
    switch(this.timeInt) {
      case 'month':
        return formatM(date)+'';
        break;
      case 'week':
        return formatW(date)+'';
        break;
      default:
        return date+'';
                       } 
  }

  groupDataByDate(arr){
    var data = this.prepareData(arr);

    var datanew = [],
        that = this;
    data.map(function(x){
      if((datanew.length !== 0) && (that.formatTime(datanew[datanew.length-1].id) == that.formatTime(x.date))) {
        if(datanew[datanew.length-1].visitors.indexOf(x.name) < 0 ){
          datanew[datanew.length-1].visitors.push(x.name);
        }
        datanew[datanew.length-1].pageviews += x.pageviews;
        datanew[datanew.length-1].organic_search += x.organic_search;
        datanew[datanew.length-1].visits++;
      } else {
        datanew.push({'id': x.date,'visitors': [x.name], 'visits': 1, 'pageviews': x.pageviews, 'organic_search': x.organic_search });
      }

    });
    
    return datanew;
  }
  
}

export default DataPrep;