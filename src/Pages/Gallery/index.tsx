import { useState } from "react";
import { BreadCrumb } from "../../Components/Common";
import GetCeritficateSection from "../../Components/Common/GetCeritficateSection";
import { Queries } from "../../Api";
import { useAppDispatch } from "../../Store/Hook";
import { setModalPhotoLink } from "../../Store/Slices/VideoModalSlice";
import Loader from "../../Components/Common/Loader";


const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const dispatch = useAppDispatch();

  const { data, isLoading } = Queries.useGetAllGallary();

  const allImages = data?.data?.gallery_data;

  const allTabs = allImages?.map((item) => item?.title);
  allTabs?.unshift("All");

  const filteredImages =
    activeFilter === "All"
      ? allImages?.flatMap((item: any) => item.images) || []
      : allImages?.filter((item) => item?.title === activeFilter)[0]?.images;

  return (

    <>
      <Loader loading={isLoading} />
      <div>
        <section>
          <BreadCrumb title="Gallery Grid" />
        </section>

        <section className="">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="11909"
            className=" elementor elementor-11909"
          >
            {/* ======================= SECTION 1 ======================= */}
            <section
              className="my-10! elementor-section elementor-top-section elementor-element elementor-element-31af01f elementor-section-boxed elementor-section-height-default elementor-section-height-default"
              data-id="31af01f"
              data-element_type="section"
            >
              <div className="elementor-container elementor-column-gap-extended">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-7501902"
                  data-id="7501902"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-52ea3fa elementor-widget elementor-widget-edublink-gallery-filter"
                      data-id="52ea3fa"
                      data-element_type="widget"
                      data-widget_type="edublink-gallery-filter.default"
                    >
                      <div className="elementor-widget-container">
                        <div
                          className="edublink-gallery-filter"
                          id="edublink-gallery-filter-id-52ea3fa"
                        >
                          {/* FILTER BUTTONS */}
                          <div className="edublink-gallery-filter-container">
                            <div className="edublink-gallery-filter-control">
                              {allTabs?.map((tab, index) => {
                                return (
                                  <button
                                    key={index}
                                    className={`filter-item ${activeFilter === tab ? "current" : ""
                                      }`}
                                    onClick={() => setActiveFilter(tab)}
                                  >
                                    {tab}
                                  </button>
                                );
                              })}


                            </div>

                            {/* GRID ITEMS */}
                            <div
                              className="edublink-gallery-items-wrapper grid! sm:grid-cols-2! md:grid-cols-3!  gap-6! px-6!"

                            >
                              {filteredImages?.map((item, i) => {
                                return (
                                  <div
                                    key={i}
                                    onClick={() =>
                                      dispatch(setModalPhotoLink(item))
                                    }
                                    className={`edublink-gallery-filter-single-item p-0! m-0! `}

                                  >
                                    <a
                                      className="edu-gallery-grid-item  "
                                    >
                                      <div className="edu-gallery-grid">
                                        <div className="inner">
                                          <div className="thumbnail ">
                                            <img
                                              // decoding="async"
                                              className=" object-cover h-full! rounded-sm!"
                                              src={item}
                                              alt=""
                                            />
                                          </div>
                                        </div>
                                        <div className="zoom-icon">
                                          <i className="icon-69"></i>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ======================= SECTION 2 ======================= */}

            <GetCeritficateSection />
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;
