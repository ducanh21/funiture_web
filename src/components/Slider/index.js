import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
function Slider_component({ children }) {
    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: (
            <button type="button" className="slick-prev">
                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
            </button>
        ),
        nextArrow: (
            <button type="button" className="slick-next">
                <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
            </button>
        ),
    };

    return <Slider {...settings}>{children}</Slider>;
}

export default Slider_component;
