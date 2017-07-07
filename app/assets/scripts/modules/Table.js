var $ = require( 'jquery' );
var datatables = require( 'datatables.net' );
import json from './data/MOCK_DATA.json';

class Table {
  constructor(){
    this.table = $('#table');
    this.insertTable();
  }

  insertTable() {
    this.table.DataTable( {
      data: json,
      
      "columns": [
        { "data": "name" },
        {"data": "id"},
        { "data": "location", "defaultContent": "--" },
        
        { "data": "access" },
        { "data": "status" },
        { "data": "ip_address" }
      ]
    }  );
    

    
  }
  
}

export default Table;