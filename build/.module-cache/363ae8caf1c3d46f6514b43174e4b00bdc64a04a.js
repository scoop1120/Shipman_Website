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
        React.DOM.h1( {className:"event-title"}, this.props.data.title," ",React.DOM.small(null, this.props.data.date)),
        React.DOM.p( {className:"event-description"}, this.props.data.description),
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


var Student = React.createClass({displayName: 'Student',
  render: function(){
    var url = "edit_this_folder/members/profile_pictures/" + this.props.data.picture_url;
    var links = [];
    $.each( (this.props.data.links || []), function(index, val) {
      if(index == "linkedin"){
        links.push(
          React.DOM.div( {className:"profile-link pull-right"}, 
            React.DOM.a( {href:val}  ,  " ", React.DOM.img( {className:"img-responsive", src:"img/linkedin.png"} ), " " )
          )
        )
      }
      else if(index == "email"){
        var mailto = "mailto:" + val;
        links.push(
          React.DOM.div( {className:"profile-link pull-right"}, 
            React.DOM.a( {href:mailto, className:"profile-link " } ,  " ", React.DOM.img( {className:"img-responsive", src:"img/email.png"} ), " " )
          )
        );

      }
      else{
        console.log("link ", index, " not supported")
      }

    });
    return(
      React.DOM.div( {className:"student-container col-lg-4 col-md-6"}, 
        React.DOM.div( {className:"student-inner"}, 
          React.DOM.div( {className:"img-container"}, 
            React.DOM.img( {src:url,  className:"img-responsive profile_picture"})
          ),
          React.DOM.div( {className:"content-container row"}, 
            React.DOM.div( {className:"col-sm-7 col-sm-offset-5 student-name"}, 
              React.DOM.h2(null, 
                this.props.data.first,React.DOM.br(null ),this.props.data.last
              )
            ),
            React.DOM.div( {className:"col-sm-12 text-center"}, 
              this.props.data.major 
            ),
            React.DOM.div( {className:"col-sm-12 text-center"}, 
              this.props.data.year
            ),
            React.DOM.div( {className:"col-sm-12 profile-links"}, 
              links
            )
          )
        )
      )
    )
  },
  componentDidMount : function(){
    var student = $(this.getDOMNode());
    student.hover(function() {
      student.find('.profile_picture').animate({height: 150, width: 150, "z-index": 4}, 300);
      window.setTimeout(function(){
        student.find('.img-container').css('bottom', '100px');
      }, 300)
    }, function() {
      student.find('.img-container').css('bottom', '0');
      window.setTimeout(function(){
        student.find('.profile_picture').animate({height: "100%", width: "100%", "z-index":10}, 300);
      }, 150)
    });
  }
});

var Students = React.createClass({displayName: 'Students',
  render: function(){
    var students = this.props.data || [];
    var profiles = []; 
    $.each(students, function(index, val) {
      profiles.push(Student( {data:val} ))
    });
    return(
      React.DOM.div( {className:"profile-container row"}, 
        profiles
      )
    )
  }
})





  
