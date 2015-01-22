/**
 * @jsx React.DOM
 */


var Carousel = React.createClass({displayName: 'Carousel',
  render: function(){
    var slides = [];
    var pictures = this.props.pictures || [];
    $.each(pictures, function(index, val) {
      slides.push (React.DOM.div( {className:"carousel-item"}
      ))
    });
    return(
        React.DOM.div( {className:"carousel"}, 
          slides
        )
      )
  },
  componentDidMount: function(){
    $('.carousel').owlCarousel({
 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 

  }
});
  
