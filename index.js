document.addEventListener("DOMContentLoaded", function () {
  // reference to the targeted element
  var sliderContainer = document.querySelector(".slider");
  var slidesContainer = document.querySelector(".slides-container");
  var slides = Array.from(document.querySelectorAll(".slide1"));
  var scrollButtons = Array.from(document.querySelectorAll(".scroll > p"));

  // actual width to tanslate
  var slideWidth = slides[0].offsetWidth;
  var activeSlideIndex = 0;

  // function which checks for two main condition if in mobile view or not
  // if yes then rather than sliding it'll show single slide and do the basic display none/block
  function showSlide() {
    if (window.innerWidth < 768) {
      slides.forEach(function (slide, index) {
        var slideHeader = slide.querySelector(".slide-header");
        if (index === activeSlideIndex) {
          slide.style.display = "block";
          slide.classList.remove("slide-blur");
          slide.classList.add("slide-num2");
          slideHeader.classList.add("text");
        } else {
          slide.style.display = "none";
          slide.classList.remove("slide-num2");
          slideHeader.classList.remove("text");
          slide.classList.add("slide-blur");
        }
      });
    } else {
      // else than it'll do the sliding where one element won't be blurred n others would be by toggling the class
      slides.forEach(function (slide, index) {
        var slideHeader = slide.querySelector(".slide-header");
        if (index === activeSlideIndex) {
          slide.classList.remove("slide-blur");
          slide.classList.add("slide-num2");
          slideHeader.classList.add("text");
        } else {
          slide.classList.add("slide-blur");
          slide.classList.remove("slide-num2");
          slideHeader.classList.remove("text");
        }
      });
      // by how much it'should translate too
      slidesContainer.style.transform = `translateX(-${
        activeSlideIndex * slideWidth
      }px)`;
    }

    // for making the slide button which is p tag actually change according to main item
    scrollButtons.forEach(function (button, index) {
      if (index === activeSlideIndex) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  // making the the click function work in p tag
  function handleScrollButtonClick(index) {
    activeSlideIndex = index;
    showSlide();
  }

  scrollButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      handleScrollButtonClick(index);
    });

    button.addEventListener("mouseover", function () {
      scrollButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });

    button.addEventListener("mouseleave", function () {
      button.classList.remove("active");
    });
  });

  // autoslide if to check mobile viewport again to remove slide n add block/none
  function autoSlide() {
    if (window.innerWidth < 768) {
      activeSlideIndex = (activeSlideIndex + 1) % slides.length;
      showSlide();
    } else {
      activeSlideIndex = (activeSlideIndex + 1) % scrollButtons.length;
      handleScrollButtonClick(activeSlideIndex);
    }
  }

  //auto slide time
  setInterval(autoSlide, 2400);

  showSlide();
});

document.addEventListener("DOMContentLoaded", function () {
  var testimonialsContainer = document.querySelector(".testimonials");
  var testimonials = Array.from(
    testimonialsContainer.querySelectorAll(".card")
  );
  var testimonialsText = Array.from(
    testimonialsContainer.querySelectorAll(".scroll1 > p")
  );
  var activeTestimonialIndex = 0;
  var intervalId;

  function showTestimonial() {
    if (window.innerWidth < 768) {
      testimonials.forEach(function (testimonial, index) {
        if (index === activeTestimonialIndex) {
          testimonial.classList.remove("slide-blur");
          testimonial.style.display = "block";
        } else {
          testimonial.classList.add("slide-blur");
          testimonial.style.display = "none";
        }
      });
    } else {
      testimonials.forEach(function (testimonial, index) {
        if (index === activeTestimonialIndex) {
          testimonial.classList.remove("slide-blur");
          testimonial.classList.add("active1");
        } else {
          testimonial.classList.add("slide-blur");
          testimonial.classList.remove("active1");
        }
      });
    }

    testimonialsText.forEach(function (text, index) {
      if (index === activeTestimonialIndex) {
        text.classList.add("active1");
      } else {
        text.classList.remove("active1");
      }
    });
  }

  function handleTestimonialClick(index) {
    activeTestimonialIndex = index;
    clearInterval(intervalId);
    showTestimonial();
    startAutoSlide();
  }

  testimonialsText.forEach(function (text, index) {
    text.addEventListener("click", function () {
      handleTestimonialClick(index);
    });

    text.addEventListener("mouseover", function () {
      testimonialsText.forEach(function (txt) {
        txt.classList.remove("active1");
      });
      text.classList.add("active1");
    });

    text.addEventListener("mouseleave", function () {
      text.classList.remove("active1");
    });
  });

  function startAutoSlide() {
    if (window.innerWidth < 768) {
      intervalId = setInterval(function () {
        activeTestimonialIndex =
          (activeTestimonialIndex + 1) % testimonials.length;
        showTestimonial();
      }, 2000);
    } else {
      intervalId = setInterval(function () {
        activeTestimonialIndex =
          (activeTestimonialIndex + 1) % testimonialsText.length;
        showTestimonial();
      }, 2000);
    }
  }

  startAutoSlide();
});
