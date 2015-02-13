/**
 * @jsx React.DOM
 */


var LandingTitle = React.createClass({displayName: "LandingTitle",
  render: function(){
    return(
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "title-container col-lg-6 col-lg-offset-3"}, 
          React.createElement("h1", {className: "title"}, 
            this.props.title
          ), 
          React.createElement("p", {className: "description"}, 
            this.props.description
          )
        )
      )
      );
  }
})

var CarouselImage = React.createClass({displayName: "CarouselImage",
  render: function(){

    var img_url = "edit_this_folder/landing_pictures/"
    img_url += this.props.data.img_url || "";
    return (
      React.createElement("div", {className: "item"}, 
        React.createElement("img", {className: "img-responsive", src: img_url})
      )
    )
  }
})

var Carousel = React.createClass({displayName: "Carousel",
  render: function(){
    var slides = [];
    var pictures = this.props.pictures || [];
    $.each(pictures, function(index, val) {
      slides.push (React.createElement(CarouselImage, {key: index, data: val}))
    });
    return(
        React.createElement("div", {className: "carousel"}, 
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

var EventPicture = React.createClass({displayName: "EventPicture",
  render : function(){
    var url = "edit_this_folder/events/event_pictures/" + this.props.picture_url;
    return(
      React.createElement("div", {className: "event-picture-container col-md-6 col-sm-12"}, 
        React.createElement("img", {className: "img-responsive", src: url})
      )
    )
  }
}); 

var Event = React.createClass({displayName: "Event",
  render: function(){
    var pictures = [];
    $.each((this.props.data.picture_urls || []), function(index, val) {
      pictures.push(React.createElement(EventPicture, {key: index, picture_url: val}))
    });
    return(
      React.createElement("div", {className: "event-container"}, 
        React.createElement("h1", {className: "event-title"}, this.props.data.title, " ", React.createElement("small", null, this.props.data.date)), 
        React.createElement("p", {className: "event-description"}, this.props.data.description), 
        React.createElement("div", {className: "pictures-container"}, 
          pictures
        )
      )
    )
  }
});

var Events = React.createClass({displayName: "Events",
  render: function(){
    var events = [];
    $.each( (this.props.data || []), function(index, val) {
      events.push(React.createElement(Event, {key: index, data: val}))
    });
    return(
      React.createElement("div", {className: "events-container"}, 
        events
      )
    )
  }
});


var Student = React.createClass({displayName: "Student",
  render: function(){
    var url = "edit_this_folder/members/profile_pictures/" + this.props.data.picture_url;
    var links = [];
    $.each( (this.props.data.links || []), function(index, val) {
      if(index == "linkedin"){
        links.push(
          React.createElement("div", {className: "profile-link pull-right"}, 
            React.createElement("a", {href: val}, " ", React.createElement("img", {className: "img-responsive", src: "img/linkedin.png"}), " ")
          )
        )
      }
      else if(index == "email"){
        var mailto = "mailto:" + val;
        links.push(
          React.createElement("div", {className: "profile-link pull-right"}, 
            React.createElement("a", {href: mailto, className: "profile-link "}, " ", React.createElement("img", {className: "img-responsive", src: "img/email.png"}), " ")
          )
        );

      }
      else{
        console.log("link ", index, " not supported")
      }

    });
    return(
      React.createElement("div", {className: "student-container col-lg-4 col-md-6"}, 
        React.createElement("div", {className: "student-inner"}, 
          React.createElement("div", {className: "img-container"}, 
            React.createElement("img", {src: url, className: "img-responsive profile_picture"})
          ), 
          React.createElement("div", {className: "content-container row"}, 
            React.createElement("div", {className: "col-sm-12 text-center student-name"}, 
              React.createElement("h2", null, 
                this.props.data.first, React.createElement("br", null), this.props.data.last
              )
            ), 
            React.createElement("div", {className: "col-sm-12 text-center student-major"}, 
              React.createElement("small", null, 
                "Major"
              ), 
              React.createElement("h1", null, 
                this.props.data.major
              )
            ), 
            React.createElement("div", {className: "col-sm-12 text-center student-year"}, 
              React.createElement("small", null, 
                "Class"
              ), 
              React.createElement("h1", null, 
                this.props.data.year
              )
            ), 
            React.createElement("div", {className: "col-sm-12 text-center student-hometown"}, 
              React.createElement("small", null, 
                "Hometome"
              ), 
              React.createElement("h1", null, 
                this.props.data.hometown
              )
            ), 
            React.createElement("div", {className: "col-sm-12 profile-links"}, 
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
      student.find( '.profile_picture' ).animate( {height: "0%", width: "0%"}, 300, function(){
          //student.find('.profile-links').css('z-index', '15');
      });

    }, function() {
      //student.find('.profile-links').css('z-index', '5');

      window.setTimeout(function(){
        //student.find('.profile-links').css('z-index', '5');
        student.find('.profile_picture').animate({height: "100%", width: "100%", "z-index":10}, 300);
      }, 200)

    });

  }
});


var YearToValueValues = {
  "freshman" : 5,
  "sophomore" : 4,
  "junior" : 3,
  "senior" : 2, 
  "graduate" : 1
}

function YearToValue(year){
  return YearToValueValues[year];
}

function SortStudents(student1, student2){
  var one = YearToValue(student1.year.toLowerCase());
  var two = YearToValue(student2.year.toLowerCase());
  if(one == two){
    if(student1.last < student2.last){
      return -1;
    }
    else{
      return 1;
    }
  }
  else{
    return one-two;
  }
}

var students_g ;

var Students = React.createClass({displayName: "Students",
  render: function(){
    var students = this.props.data || [];
    var profiles = []; 
    students_g = students;
    console.log(students);
    students.sort(SortStudents);
    $.each(students, function(index, val) {
      profiles.push(React.createElement(Student, {data: val}))
    });
    return(
      React.createElement("div", {className: "profile-container row"}, 
        profiles
      )
    )
  }
})





  
