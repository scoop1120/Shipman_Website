/**
 * @jsx React.DOM
 */

// REPLACE WITH BACKBONE WHEN PORTING

// load table data 
$.get('edit_this_folder/data.json', function(data) {
  
  React.renderComponent(
    Carousel( {pictures:data.landing_slides}
    ),
    document.getElementById('carousel-container')
  );

  React.renderComponent(
    LandingTitle( {title:data.landing_title, description:data.landing_description} )
    )


});


