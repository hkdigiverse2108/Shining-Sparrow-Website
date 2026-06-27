import { useState } from "react";
import { BreadCrumb } from "../../Components/Common";
import GetCeritficateSection from "../../Components/Common/GetCeritficateSection";
import { Queries } from "../../Api";
import { useAppDispatch } from "../../Store/Hook";
import { setModalPhotoLink } from "../../Store/Slices/VideoModalSlice";
import Loader from "../../Components/Common/Loader";
import { getImageUrl } from "../../Constants";
import type { Gallery as GalleryType } from "../../Types/Gallary";

const Gallery = () => {
  const [selectedFolder, setSelectedFolder] = useState<GalleryType | null>(null);
  const [visibleFoldersCount, setVisibleFoldersCount] = useState(3);

  const dispatch = useAppDispatch();
  const { data, isLoading } = Queries.useGetAllGallary();

  const allImages = data?.data?.gallery_data;

  return (
    <>
      <Loader loading={isLoading} />
      <div>
        <section>
          <BreadCrumb title={selectedFolder ? `${selectedFolder.title}` : "Gallery"} />
        </section>

        <section className="">
          <div
            data-elementor-type="wp-page"
            data-elementor-id="11909"
            className="elementor elementor-11909"
          >
            {/* ======================= SECTION 1 ======================= */}
            <section
              className="my-10! elementor-section elementor-top-section elementor-element elementor-element-31af01f elementor-section-boxed elementor-section-height-default"
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
                          <div className="edublink-gallery-filter-container">
                            {!selectedFolder ? (
                              <>
                                {/* FOLDERS GRID - 1 row has 3 folders */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                                  {allImages?.slice(0, visibleFoldersCount).map((folder, index) => {
                                    const firstImage = folder.images && folder.images.length > 0 ? folder.images[0] : "";
                                    return (
                                      <div
                                        key={index}
                                        onClick={() => setSelectedFolder(folder)}
                                        className="h-full! mb-0! group cursor-pointer"
                                      >
                                        <div className="edublink-single-course course-style-2 h-full!">
                                          <div className="inner h-full! bg-white! flex flex-col">
                                            <div className="thumbnail">
                                              <div className="course-thumb">
                                                {firstImage ? (
                                                  <img
                                                    className="w-100"
                                                    src={getImageUrl(firstImage)}
                                                    alt={folder.title}
                                                    style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", backgroundColor: "#fff" }}
                                                  />
                                                ) : (
                                                  <div className="w-100 flex items-center justify-center bg-gray-200" style={{ width: "100%", aspectRatio: "3/2" }}>
                                                    <svg fill="currentColor" viewBox="0 0 20 20" style={{ color: "#a0aec0", width: "48px", height: "48px" }}>
                                                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                    </svg>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            <div className="content flex-1 flex flex-col justify-between">
                                              <div>
                                                <h6 className="title">
                                                  <span>{folder.title}</span>
                                                </h6>

                                                <p className="line-clamp-3 mb-4!">{folder.description || "View photos in this album"}</p>
                                              </div>

                                              <div className="read-more-btn">
                                                <button className="edu-btn btn-small btn-secondary" style={{ backgroundColor: "#b57a3f", borderColor: "#b57a3f" }}>
                                                  Open Folder<i className="icon-4"></i>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* LOAD MORE BUTTON - loads another 3 folders */}
                                {allImages && allImages.length > visibleFoldersCount && (
                                  <div className="flex justify-center mt-[30px]! mb-6">
                                    <button
                                      onClick={() => setVisibleFoldersCount((prev) => prev + 3)}
                                      className="edu-btn btn-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                      style={{
                                        backgroundColor: "#f97316",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "12px 32px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontFamily: "var(--edublink-font-secondary)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        lineHeight: "1"
                                      }}
                                    >
                                      Load More
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {/* SELECTED FOLDER VIEW WITH IMAGES */}
                                <div className="px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                                  <div>
                                    <button
                                      onClick={() => setSelectedFolder(null)}
                                      className="edu-btn btn-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                                      style={{
                                        backgroundColor: "#f97316",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "12px 32px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontFamily: "var(--edublink-font-secondary)",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        textAlign: "center",
                                        lineHeight: "1",
                                        gap: "8px",
                                        marginBottom: "16px"
                                      }}
                                    >
                                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "18px", height: "18px", strokeWidth: "3", color: "#fff" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                      </svg>
                                      <span>Back to Folders</span>
                                    </button>
                                    
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
                                      <svg className="flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--edublink-color-primary, #f97316)", width: "26px", height: "26px" }}>
                                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                      </svg>
                                      <h3 
                                        className="m-0"
                                        style={{
                                          fontFamily: "var(--edublink-font-secondary)",
                                          fontSize: "32px",
                                          fontWeight: 800,
                                          color: "var(--edublink-color-secondary, #1b223c)",
                                          paddingTop:"20px"
                                        }}
                                      >
                                        {selectedFolder.title}
                                      </h3>
                                    </div>
                                    
                                    <p 
                                      className="mt-3 m-0 max-w-2xl leading-relaxed"
                                      style={{
                                        fontFamily: "var(--edublink-font-primary)",
                                        fontSize: "15px",
                                        color: "#5b616c"
                                      }}
                                    >
                                      {selectedFolder.description || "View photos in this album"}
                                    </p>
                                  </div>
                                  
                                  <div 
                                    className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 self-start md:self-center"
                                    style={{
                                      fontFamily: "var(--edublink-font-primary)",
                                      fontSize: "15px",
                                      fontWeight: 600,
                                      color: "#5b616c"
                                    }}
                                  >
                                    {selectedFolder.images?.length || 0} {selectedFolder.images?.length === 1 ? "Photo" : "Photos"}
                                  </div>
                                </div>

                                {/* Dynamic Balanced 3-column Grid for Folder Images */}
                                <div className="edublink-gallery-items-wrapper grid! grid-cols-1 md:grid-cols-3 gap-6! px-6!">
                                  {/* Column 1 */}
                                  <div className="flex flex-col gap-6!">
                                    {(() => {
                                      const col: string[] = [];
                                      selectedFolder.images?.forEach((img, idx) => {
                                        if (idx % 3 === 0) col.push(img);
                                      });
                                      return col.map((item, i) => (
                                        <div
                                          key={`col1-${i}`}
                                          onClick={() => dispatch(setModalPhotoLink(item))}
                                          className="edublink-gallery-filter-single-item p-0! m-0!"
                                        >
                                          <a className="edu-gallery-grid-item">
                                            <div className="edu-gallery-grid">
                                              <div className="inner">
                                                <div className="thumbnail">
                                                  <img
                                                    className="w-full! h-auto! rounded-sm!"
                                                    src={getImageUrl(item)}
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
                                      ));
                                    })()}
                                  </div>

                                  {/* Column 2 */}
                                  <div className="flex flex-col gap-6!">
                                    {(() => {
                                      const col: string[] = [];
                                      selectedFolder.images?.forEach((img, idx) => {
                                        if (idx % 3 === 1) col.push(img);
                                      });
                                      return col.map((item, i) => (
                                        <div
                                          key={`col2-${i}`}
                                          onClick={() => dispatch(setModalPhotoLink(item))}
                                          className="edublink-gallery-filter-single-item p-0! m-0!"
                                        >
                                          <a className="edu-gallery-grid-item">
                                            <div className="edu-gallery-grid">
                                              <div className="inner">
                                                <div className="thumbnail">
                                                  <img
                                                    className="w-full! h-auto! rounded-sm!"
                                                    src={getImageUrl(item)}
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
                                      ));
                                    })()}
                                  </div>

                                  {/* Column 3 */}
                                  <div className="flex flex-col gap-6!">
                                    {(() => {
                                      const col: string[] = [];
                                      selectedFolder.images?.forEach((img, idx) => {
                                        if (idx % 3 === 2) col.push(img);
                                      });
                                      return col.map((item, i) => (
                                        <div
                                          key={`col3-${i}`}
                                          onClick={() => dispatch(setModalPhotoLink(item))}
                                          className="edublink-gallery-filter-single-item p-0! m-0!"
                                        >
                                          <a className="edu-gallery-grid-item">
                                            <div className="edu-gallery-grid">
                                              <div className="inner">
                                                <div className="thumbnail">
                                                  <img
                                                    className="w-full! h-auto! rounded-sm!"
                                                    src={getImageUrl(item)}
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
                                      ));
                                    })()}
                                  </div>
                                </div>
                              </>
                            )}
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
