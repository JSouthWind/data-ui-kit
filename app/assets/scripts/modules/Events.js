import $ from 'jquery';
import json from './data/MOCK_DATA.json';
import DataPrep from './DataPrep';
import Chart from './Chart';
import Stats from './Stats';

class Events {
  constructor(dataJSON){
    this.btn = $('.controls__group__btn');
    this.select = $("#mode");
    this.mode = 'page-views';
    this.timeInt = 'week';
    this.dataPrep = new DataPrep(json, this.timeInt, this.mode);
    this.chart = new Chart(this.dataPrep.getChartData);
    this.stats = new Stats(this.dataPrep.getStats);
    //this.dataToHTML();
    this.events();
  }

  events(){
    
    var that = this;
    
    // clicking on select#main
    
    this.select.change(function(event){
      that.mode = $(this).val();
      that.dataPrep = new DataPrep(json, that.timeInt, that.mode);
      that.chart.update(that.dataPrep.getChartData);
      that.stats = new Stats(that.dataPrep.getStats);
      
    });
    
    // clicking on btns day week month
    
    this.btn.click(function(event){
      that.timeInt = this.id;
      that.dataPrep = new DataPrep(json, that.timeInt, that.mode);
      that.chart.update(that.dataPrep.getChartData);
      that.stats = new Stats(that.dataPrep.getStats);
      
      that.btn.removeClass('controls__group__btn--green');
      this.className += ' controls__group__btn--green';
    });
  }
  
  dataToHTML() {
    var dataPrep = new DataPrep(json, this.timeInt, this.mode),
        chart = new Chart(dataPrep.getChartData),
        stats = new Stats(dataPrep.getStats);
  }
  
}
export default Events;