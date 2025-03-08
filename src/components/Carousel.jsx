import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  // Sample images for the carousel
  const images = [
    {
      src: "/images/group-of-students.webp",
      alt: "",
      caption: "",
    },
    {
      src: "/images/medical-staff.jpg",
      alt: "",
      caption: "",
    },
    {
      src: "/images/wellness-workshop.jpg",
      alt: "Wellness Workshop",
      caption: "Student Wellness Programs",
    },
    {
      src: "/images/medical-equipment.jpg",
      alt: "Medical Equipment",
      caption: "",
    },
  ];

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.src} alt={image.alt} className="w-full h-64 md:h-80 lg:h-96 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-lg md:text-xl font-semibold">{image.caption}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
