// <!--====== Swiper Section ======-->

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

export const TestimonialSettings = {
  modules: [Autoplay, EffectCoverflow, Pagination],
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
  },
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: 80,
    depth: 180,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};
