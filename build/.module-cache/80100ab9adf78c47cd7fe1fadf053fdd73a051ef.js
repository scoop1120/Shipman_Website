/**
 * @jsx React.DOM
 */


var CarouselImage = React.createClass({displayName: 'CarouselImage',
  render: function(){
    var img_url = this.props.data.img_url || "";
    return (
      React.DOM.div( {className:"item"}, 
        React.DOM.img( {src:img_url})
      )
    )
  }
})

var Carousel = React.createClass({displayName: 'Carousel',
  render: function(){
    var slides = [];
    var pictures = this.props.pictures || [];
    $.each(pictures, function(index, val) {
      slides.push (CarouselImage( {data:val} ))
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
  
