/**
 * @jsx React.DOM
 */

// REPLACE WITH BACKBONE WHEN PORTING

// load table data 
$.get('edit_this_folder/data.json', function(data) {
  
  React.renderComponent(
    Carousel(null
    ),
    document.getElementById('carousel-container')
  );

});


