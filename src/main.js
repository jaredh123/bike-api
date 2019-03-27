import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#bike-form').submit(function(event) {
    event.preventDefault();
    let color = $('#color').val();

    console.log(color);

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
      $('.location').append(location);
      $('.title').append(title);
      $('.year').append(year);


    }).fail(function(error)
    {
      $('.color').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  });
});
