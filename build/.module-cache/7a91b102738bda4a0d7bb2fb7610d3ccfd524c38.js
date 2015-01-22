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
    $('.carousel').slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      slide: '> div',
      cssEase: 'linear'
    });

  }
});
  
