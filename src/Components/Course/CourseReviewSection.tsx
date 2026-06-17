import { Queries } from "../../Api";
import { Progress, Rate } from "antd";

interface CourseReviewSectionProps {
  courseId?: string;
}

const CourseReviewSection = ({ courseId }: CourseReviewSectionProps) => {
  // const { data: ratingSummary } = Queries.useGetTestimonialRatingSummary();
  const { data: ratingSummary } = Queries.useGetTestimonialRatingSummary(courseId || "69259b3b0eae08a2ef76d404");
  const { data: testimonialsData } = Queries.useGetTestimonialsByType("course");

  const ratingData = ratingSummary?.data;
  const testimonials = testimonialsData?.data?.testimonial_data || [];
  return (
    <div className="course-tab-panel-reviews course-tab-panel" id="tab-reviews">
      <div className="learnpress-course-review" data-id="12817">
        <div className="lp-rating-reviews flex! max-sm:flex-col! gap-6!">
          <div className="course-rate">
            <div className="course-rate__summary">
              <div className="course-rate__summary-value">
                {ratingData?.averageRating?.toFixed(1) || "0"}
              </div>

              <div className="course-rate__summary-stars">
                <Rate
                  allowHalf
                  defaultValue={ratingData?.averageRating || 0}
                  disabled
                  style={{ fontSize: '16px', color: '#FFB606' }}
                />
              </div>

              <div className="course-rate__summary-text">
                <span>{ratingData?.totalRated || 0}</span> ratings
              </div>
            </div>
          </div>

          {/* ================= RATING BREAKDOWN ================= */}

          <div className="course-rate__details  p-2! w-full! flex! flex-col! gap-3! ">
            {[5, 4, 3, 2, 1].map((star) => {
              const distribution = ratingData?.ratingDistribution?.find(
                (d) => d.rate === star,
              );
              const count = distribution?.count || 0;
              const percentage = ratingData?.totalRated
                ? (count / ratingData.totalRated) * 100
                : 0;
              return (
                <div
                  className="course-rate__details-row flex! gap-3! w-full!"
                  key={star}
                >
                  <span className="course-rate__details-row-star flex gap-4! ">
                    {star}
                    <i className="fas" style={{ color: "#ffb60a" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 
                    6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
                    0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 
                    3.356.83 4.73c.078.443-.36.79-.746.592L8 
                    13.187l-4.389 2.256z"
                        />
                      </svg>
                    </i>
                  </span>
                  <div className="course-rate__details-row-bar flex-1!  w-full! " >
                    <Progress percent={percentage} showInfo={false}  strokeColor="var(--edublink-color-tertiary)" />
                  </div>

                  <div className="course-rate__details-row-value">
                    <div className="rating-gray"></div>
                    <div
                      className="rating"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>
                    <span className="rating-count">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= REVIEWS LIST ================= */}

        <div id="course-reviews">
          <h3 className="course-review-head">Reviews</h3>

          <ul className="course-reviews-list space-y-12!">
            {testimonials?.map((testimonial) => (
              <li key={testimonial._id}>
                <div className="review-author">
                  <img
                    width="96"
                    height="96"
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="avatar avatar-96 photo"
                  />
                </div>

                <div className="review-author-info">
                  <div className="review-top">
                    <h4 className="user-name ">{testimonial.name}</h4>

                    <div className=" flex! ">
                      <Rate
                        allowHalf
                        defaultValue={testimonial.rate}
                        disabled
                        style={{ fontSize: '14px', color: '#FFB606' }}
                        className=" flex! h-fit!"
                      />
                    </div>
                  </div>

                  <p className="review-title">{testimonial.designation}</p>

                  <div className="review-text">
                    <div className="review-content">
                      {testimonial.description}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewSection;
