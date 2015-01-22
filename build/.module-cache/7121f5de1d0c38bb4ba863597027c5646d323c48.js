/**
 * @jsx React.DOM
 */


var LandingTitle = React.createClass({displayName: 'LandingTitle',
  render: function(){
    return(
      React.DOM.div( {className:"row"}, 
        React.DOM.div( {className:"title-container col-lg-6 col-lg-offset-3"}, 
          React.DOM.h1( {className:"title"}, 
            this.props.title
          ),
          React.DOM.div( {className:"description"}, 
            this.props.description
          )  
        )
      )
      );
  }
})

var CarouselImage = React.createClass({displayName: 'CarouselImage',
  render: function(){

    var img_url = "edit_this_folder/landing_pictures/"
    img_url += this.props.data.img_url || "";
    return (
      React.DOM.div( {className:"item"}, 
        React.DOM.img( {className:"img-responsive", src:img_url})
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
      slideSpeed : 500,
      paginationSpeed : 400,
      singleItem:true,
      autoPlay:4000
 
      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
 
  });
 

  }
});
  
