import $ from 'jquery';

export class BikeService {
  getBikesByCity(location, count) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=${count}&query=Seattle&location=${location}&distance=10&stolenness=stolen`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  printLocation(response){
    let location = "";
    for (let i = 0; i < response.bikes.length; i++) {
      location += "<li>" + response.bikes[i].stolen_location + "</li><br>";
    }
    return location;
  }


  printTitle(response){
    let title = "";
    for (let i = 0; i < response.bikes.length; i++) {
      title += "<li>" + response.bikes[i].title + "</li><br>";
    }
    return title;
  }


  printYear(response){
    let year = "";
    for (let i = 0; i < response.bikes.length; i++) {
      year += "<li>" + response.bikes[i].year + "</li><br>";
    }
    return year;
  }
}
