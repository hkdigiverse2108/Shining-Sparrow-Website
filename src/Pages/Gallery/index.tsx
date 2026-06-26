import { useState } from "react";
import { BreadCrumb } from "../../Components/Common";
import GetCeritficateSection from "../../Components/Common/GetCeritficateSection";
import { Queries } from "../../Api";
import { useAppDispatch } from "../../Store/Hook";
import { setModalPhotoLink } from "../../Store/Slices/VideoModalSlice";
import Loader from "../../Components/Common/Loader";
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
                                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full"
                                      >
                                          {/* Image Cover container */}
                                          <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                                            {firstImage ? (
                                              <img
                                                src={firstImage}
                                                alt={folder.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                              />
                                            ) : (
                                              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <svg fill="currentColor" viewBox="0 0 20 20" style={{ color: "#a0aec0", width: "48px", height: "48px" }}>
                                                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                </svg>
                                              </div>
                                            )}
                                          </div>

                                        {/* Folder content details */}
                                        <div className="p-6 flex flex-col flex-grow items-center text-center">
                                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", width: "100%", marginBottom: "8px" }}>
                                            <svg className="flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--edublink-color-primary, #f97316)", width: "22px", height: "22px" }}>
                                              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                            </svg>
                                            <span 
                                              className="group-hover:text-orange-500 transition-colors duration-200"
                                              style={{
                                                fontFamily: "var(--edublink-font-secondary)",
                                                fontSize: "22px",
                                                fontWeight: 700,
                                                color: "var(--edublink-color-secondary, #1b223c)",
                                                lineHeight: "1.2"
                                              }}
                                            >
                                              {folder.title}
                                            </span>
                                          </div>
                                          
                                          <p 
                                            className="line-clamp-2 leading-relaxed flex-grow m-0"
                                            style={{
                                              fontFamily: "var(--edublink-font-primary)",
                                              fontSize: "15px",
                                              color: "#5b616c",
                                              lineHeight: "1.6",
                                              marginTop: "6px"
                                            }}
                                          >
                                            {folder.description || "View photos in this album"}
                                          </p>
                                          
                                          {/* Footer link */}
                                          <div 
                                            className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-orange-500 font-semibold w-full"
                                            style={{
                                              fontFamily: "var(--edublink-font-secondary)",
                                              fontSize: "14px",
                                              fontWeight: 600,
                                              color: "var(--edublink-color-primary, #f97316)"
                                            }}
                                          >
                                            <span>Open Folder</span>
                                            <svg className="transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: "16px", height: "16px", strokeWidth: "2.5" }}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
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
