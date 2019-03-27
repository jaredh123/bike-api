import $ from 'jquery';

export

export function template(){
  $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=IP&distance=10&stolenness=stolen&query=${color}`).then(function(response)
  {
    let location = "";
    let title = "";
    let year = "";
    for (let i = 0; i < response.bikes.length; i++) {
      location += "<li>" + response.bikes[i].stolen_location + "</li><br>";
      title += "<li>" + response.bikes[i].title + "</li><br>";
      year += "<li>" + response.bikes[i].year + "</li><br>";
    }
  }).fail(function(error)
  {
  let error = (`There was an error processing your request: ${error.responseText}. Please try again.`);
  });

  return location, title, year, error;
}
