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
          React.DOM.p( {className:"description"}, 
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
      slides.push (CarouselImage( {key:index, data:val} ))
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

var EventPicture = React.createClass({displayName: 'EventPicture',
  render : function(){
    var url = "edit_this_folder/events/event_pictures/" + this.props.picture_url;
    return(
      React.DOM.div( {className:"event-picture-container col-md-6 col-sm-12"}, 
        React.DOM.img( {className:"img-responsive", src:url} )
      )
    )
  }
}); 

var Event = React.createClass({displayName: 'Event',
  render: function(){
    var pictures = [];
    $.each((this.props.data.picture_urls || []), function(index, val) {
      pictures.push(EventPicture( {key:index, picture_url:val} ))
    });
    return(
      React.DOM.div( {className:"event-container"}, 
        React.DOM.h1( {className:"event-title"}, this.props.data.title,React.DOM.small(null, this.props.data.date)),
        React.DOM.p( {className:"event-description"}, this.props.data.description, " " ),
        React.DOM.div( {className:"pictures-container"}, 
          pictures
        )
      )
    )
  }
});

var Events = React.createClass({displayName: 'Events',
  render: function(){
    var events = [];
    $.each( (this.props.data || []), function(index, val) {
      events.push(Event( {key:index, data:val} ))
    });
    return(
      React.DOM.div( {className:"events-container"}, 
        events
      )
    )
  }
});



  
