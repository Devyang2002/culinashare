import React from 'react'
import food2 from '../images/food1.jpg';
import '../styles/ControlledCarousel.css'
import food1 from '../images/food2.jpg'
import food3 from '../images/food3.jpg'

function ControlledCarousel() {

    const image = {
        // border: '40px solid transparent',
        // marginLeft : '5vw',
        display: 'flex!important',
        width: '100%!important',
        justifyContent: 'center!important',
        // transform: 'scale(0.7)',
        borderRadius: '8px',
        boxShadow: '0 0 40px 1px #9b5a06' ,
        borderRadius: '20px',
    }
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={food1} style={image} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={food2} style={image} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={food3} style={image} className="d-block w-100" alt="..."/>
    </div>
  </div>
</div>
  )
}

export default ControlledCarousel


