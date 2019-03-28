import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import {BikeService} from "./bike"

$(document).ready(function() {
  $('#color-form').submit(function(event) {
    event.preventDefault();
    let color = $('#color').val();
    let count = $('#count').val();

    $.get(`https://bikeindex.org:443/api/v3/search?page=1&per_page=${count}&location=IP&distance=10&stolenness=stolen&query=${color}`).then(function(response)
    {
      let bikeService = new BikeService();
      $('.location').append(bikeService.printLocation(response));
      $('.title').append(bikeService.printTitle(response));
      $('.year').append(bikeService.printYear(response));
    }).fail(function(error)
    {
      $('.color').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
    });
  });
  // =========================================

  $('#location-form').submit(function(event) {
    event.preventDefault();
    let location = $('#location').val();
    let count = $('#count').val();

    let bikeService = new BikeService();
    let promise = bikeService.getBikesByCity(location, count);

    promise.then(function(response) {
      let body = JSON.parse(response);
      let bikeService = new BikeService();
      $('.location').append(bikeService.printLocation(body));
      $('.title').append(bikeService.printTitle(body));
      $('.year').append(bikeService.printYear(body));
    }, function(error) {
      $('.error').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
