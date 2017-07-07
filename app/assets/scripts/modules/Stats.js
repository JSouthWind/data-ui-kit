class Stats {
  constructor(data){
    this.data = data;
    this.insertStats();
  }

  insertStats() {
    var mainDiv = document.getElementById('stats');
    var info = [];

    info[0] = {name: 'Visitors',
               data: this.data.visitors.length};

    info[1] = {name: 'Visits',
               data: this.data.visits};

    info[2] = {name: 'Page Views',
               data: this.data.pageviews};

    info[3] = {name: 'Organic Search',
               data: this.data.organic_search};
    
    var html = '';
    info.forEach((x) => html += `<div class="row__3"><h1 class="stats__title">${x.data}</h1><p class="stats__subtitle">${x.name}</p></div>`);

    mainDiv.innerHTML = html;
  }
}

export default Stats;