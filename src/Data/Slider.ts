// <!--====== Swiper Section ======-->

import { Autoplay, Pagination } from "swiper/modules";

export const TestimonialSettings = {
  modules: [Autoplay, Pagination],
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  loop: true,
  speed: 800,
  watchSlidesProgress: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};
