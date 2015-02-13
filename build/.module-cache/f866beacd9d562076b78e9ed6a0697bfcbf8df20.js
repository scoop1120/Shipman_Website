/**
 * @jsx React.DOM
 */

// REPLACE WITH BACKBONE WHEN PORTING

// load table data 
$.get('edit_this_folder/data.json', function(data) {
  
  React.renderComponent(
    React.createElement(Carousel, {pictures: data.landing_slides}
    ),
    document.getElementById('carousel-container')
  );

  React.renderComponent(
    React.createElement(LandingTitle, {title: data.landing_title, description: data.landing_description}),
    document.getElementById('description-container')
    )

});

$.get('edit_this_folder/events/events.json', function(data) {

  console.log("inside get");
  React.renderComponent(
    React.createElement(Events, {data: data.events}),
    document.getElementById('events')
  )

});

$.get('edit_this_folder/members/member_data.json', function(data) {

  React.renderComponent(
    React.createElement(Students, {data: data.data}),
    document.getElementById('students')
  )

});

