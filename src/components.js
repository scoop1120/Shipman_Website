/**
 * @jsx React.DOM
 */


var LandingTitle = React.createClass({
  render: function(){
    return(
      <div className="row">
        <div className="title-container col-lg-6 col-lg-offset-3">
          <h1 className="title">
            {this.props.title}
          </h1>
          <p className="description">
            {this.props.description}
          </p>  
        </div>
      </div>
      );
  }
})

var CarouselImage = React.createClass({
  render: function(){

    var img_url = "edit_this_folder/landing_pictures/"
    img_url += this.props.data.img_url || "";
    return (
      <div className="item">
        <img className="img-responsive" src={img_url}></img>
      </div>
    )
  }
})

var Carousel = React.createClass({
  render: function(){
    var slides = [];
    var pictures = this.props.pictures || [];
    $.each(pictures, function(index, val) {
      slides.push (<CarouselImage key={index} data={val} />)
    });
    return(
        <div className="carousel">
          {slides}
        </div>
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

var EventPicture = React.createClass({
  render : function(){
    var url = "edit_this_folder/events/event_pictures/" + this.props.picture_url;
    return(
      <div className="event-picture-container col-md-6 col-sm-12">
        <img className="img-responsive" src={url} />
      </div>
    )
  }
}); 

var Event = React.createClass({
  render: function(){
    var pictures = [];
    $.each((this.props.data.picture_urls || []), function(index, val) {
      pictures.push(<EventPicture key={index} picture_url={val} />)
    });
    return(
      <div className="event-container">
        <h1 className="event-title">{this.props.data.title}&nbsp;<small>{this.props.data.date}</small></h1>
        <p className="event-description">{this.props.data.description}</p>
        <div className="pictures-container">
          {pictures}
        </div>
      </div>
    )
  }
});

var Events = React.createClass({
  render: function(){
    var events = [];
    $.each( (this.props.data || []), function(index, val) {
      events.push(<Event key={index} data={val} />)
    });
    return(
      <div className="events-container">
        {events}
      </div>
    )
  }
});


var Student = React.createClass({
  render: function(){
    var url = "edit_this_folder/members/profile_pictures/" + this.props.data.picture_url;
    var links = [];
    $.each( (this.props.data.links || []), function(index, val) {
      if(index == "linkedin"){
        links.push(
          <div className="profile-link pull-right">
            <a href={val}  > <img className="img-responsive" src="img/linkedin.png" /> </a>
          </div>
        )
      }
      else if(index == "email"){
        var mailto = "mailto:" + val;
        links.push(
          <div className="profile-link pull-right">
            <a href={mailto} className="profile-link " > <img className="img-responsive" src="img/email.png" /> </a>
          </div>
        );

      }
      else{
        console.log("link ", index, " not supported")
      }

    });
    return(
      <div className="student-container col-lg-4 col-md-6">
        <div className="student-inner">
          <div className="img-container">
            <img src={url}  className="img-responsive profile_picture"/>
          </div>
          <div className="content-container row">
            <div className="col-sm-12 text-center student-name">
              <h2>
                {this.props.data.first}<br />{this.props.data.last}
              </h2>
            </div>
            <div className="col-sm-12 text-center student-major">
              <small>
                Major
              </small>
              <h1>
                {this.props.data.major} 
              </h1>
            </div>
            <div className="col-sm-12 text-center student-year">
              <small>
                Class
              </small>
              <h1>
                {this.props.data.year}
              </h1>
            </div>
            <div className="col-sm-12 text-center student-hometown">
              <small>
                Hometown
              </small>
              <h1>
                {this.props.data.hometown}
              </h1>
            </div>
            <div className="col-sm-12 profile-links">
              {links}
            </div>
          </div>
        </div>
      </div>
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

var Students = React.createClass({
  render: function(){
    var students = this.props.data || [];
    var profiles = []; 
    students_g = students;
    console.log(students);
    students.sort(SortStudents);
    $.each(students, function(index, val) {
      profiles.push(<Student data={val} />)
    });
    return(
      <div className="profile-container row">
        {profiles}
      </div>
    )
  }
})





  
