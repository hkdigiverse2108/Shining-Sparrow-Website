import { BreadCrumb } from "../../Components/Common";
import { Queries } from "../../Api";
import { WorkshopCard, MyWorkshopCard } from "../../Components/Workshop";
import { useState } from "react";
import { useAppSelector } from "../../Store/Hook";
import Loader from "../../Components/Common/Loader";
import NoData from "../../Components/Common/NoData";

const Workshop = () => {
    const LIMIT = 9;
    const MY_WORKSHOPS_LIMIT = 6;
    const [page, setPage] = useState(1);
    const [myWorkshopsPage, setMyWorkshopsPage] = useState(1);

    const { isAuthenticated } = useAppSelector((state) => state.user);

    // 1. All Workshops
    const { data: workshopData, isLoading: isWorkshopLoading } = Queries.useGetAllWorkshops({
        page,
        limit: LIMIT,
    });

    const Workshops = workshopData?.data?.workshop_data || [];
    const totalData = workshopData?.data?.totalData || 0;
    const totalPages = Math.ceil(totalData / LIMIT);

    const start = totalData > 0 ? (page - 1) * LIMIT + 1 : 0;
    const end = Math.min(page * LIMIT, totalData);

    // 2. Fetch all for "My Workshops"
    const { data: allWorkshopData, isLoading: isAllWorkshopLoading } =
        Queries.useGetAllWorkshops({}, { enabled: isAuthenticated });

    const allWorkshops = allWorkshopData?.data?.workshop_data || [];
    const myWorkshops = allWorkshops.filter((w) => w?.isUnlocked === true);
    const totalMyWorkshops = myWorkshops?.length || 0;
    const totalMyWorkshopsPages = Math.ceil(totalMyWorkshops / MY_WORKSHOPS_LIMIT);

    const isLoading = isWorkshopLoading || isAllWorkshopLoading;

    return (
        <>
            <Loader loading={isLoading} />
            <div>
                <section>
                    <BreadCrumb title="Workshop" />
                </section>
                <div id="content" className="site-content my-10! container-p">
                    <div className="site-content-inner edublink-container">
                        <div className="edublink-main-content-inner">

                            {/* MY WORKSHOPS SECTION */}
                            {isAuthenticated && myWorkshops.length > 0 && (
                                <div className="mb-10!">
                                    <div className="edublink-course-archive-top-bar-wrapper">
                                        <div className="edublink-course-archive-top-bar edublink-row">
                                            <div className="edublink-col-md-6">
                                                <h3 className="mb-0! text-2xl font-bold!">My Workshops</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1! sm:grid-cols-2! md:grid-cols-3! gap-9!  ">
                                        {myWorkshops
                                            .slice(
                                                (myWorkshopsPage - 1) * MY_WORKSHOPS_LIMIT,
                                                myWorkshopsPage * MY_WORKSHOPS_LIMIT,
                                            )
                                            .map((workshop) => (
                                                <MyWorkshopCard key={workshop._id} workshop={workshop} />
                                            ))}
                                    </div>

                                    {totalMyWorkshops > MY_WORKSHOPS_LIMIT && (
                                        <nav className="edublink-pagination-wrapper mt-6!">
                                            <ul className="page-number">
                                                <li className={myWorkshopsPage === 1 ? "opacity-30" : ""}>
                                                    <a
                                                        className="page-numbers"
                                                        onClick={() =>
                                                            myWorkshopsPage !== 1 &&
                                                            setMyWorkshopsPage((p) => p - 1)
                                                        }
                                                    >
                                                        <span className="edublink-pagination-icon icon-west "></span>
                                                    </a>
                                                </li>

                                                {Array.from(
                                                    { length: totalMyWorkshopsPages },
                                                    (_, i) => i + 1,
                                                ).map((p) => (
                                                    <li
                                                        key={p}
                                                        className={p === myWorkshopsPage ? "active" : ""}
                                                    >
                                                        <a
                                                            className={`page-numbers ${p === myWorkshopsPage ? "current" : ""}`}
                                                            onClick={() => setMyWorkshopsPage(p)}
                                                        >
                                                            {p}
                                                        </a>
                                                    </li>
                                                ))}

                                                <li
                                                    className={
                                                        myWorkshopsPage === totalMyWorkshopsPages
                                                            ? "opacity-30!"
                                                            : ""
                                                    }
                                                >
                                                    <a
                                                        className="page-numbers"
                                                        title="next"
                                                        onClick={() =>
                                                            myWorkshopsPage !== totalMyWorkshopsPages &&
                                                            setMyWorkshopsPage((p) => p + 1)
                                                        }
                                                    >
                                                        <span className="edublink-pagination-icon icon-east"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                    <hr className="my-10!" />
                                </div>
                            )}

                            {/* ALL WORKSHOPS SECTION */}
                            {Workshops?.length > 0 ? (
                                <>
                                    <div className="edublink-course-archive-top-bar-wrapper">
                                        <div className="edublink-course-archive-top-bar edublink-row">
                                            <div className="edublink-col-md-6">
                                                <h3 className="mb-4! text-2xl font-bold!">All Workshops</h3>
                                                <span className="edublink-course-archive-index-count">
                                                    Showing{" "}
                                                    <span>
                                                        {start}-{end}
                                                    </span>{" "}
                                                    Of <span>{totalData}</span> Results
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid! grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6! ">
                                        {Workshops?.map((workshop) => (
                                            <WorkshopCard key={workshop._id} workshop={workshop} />
                                        ))}
                                    </div>

                                    {totalData > LIMIT && (
                                        <nav className="edublink-pagination-wrapper">
                                            <ul className="page-number">
                                                <li className={page === 1 ? "opacity-30" : ""}>
                                                    <a
                                                        className="page-numbers"
                                                        onClick={() => page !== 1 && setPage((p) => p - 1)}
                                                    >
                                                        <span className="edublink-pagination-icon icon-west "></span>
                                                    </a>
                                                </li>

                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                    (p) => (
                                                        <li key={p} className={p === page ? "active" : ""}>
                                                            <a
                                                                className={`page-numbers ${p === page ? "current" : ""}`}
                                                                onClick={() => setPage(p)}
                                                            >
                                                                {p}
                                                            </a>
                                                        </li>
                                                    ),
                                                )}

                                                <li className={page === totalPages ? "opacity-30!" : ""}>
                                                    <a
                                                        className="page-numbers"
                                                        title="next"
                                                        onClick={() =>
                                                            page !== totalPages && setPage((p) => p + 1)
                                                        }
                                                    >
                                                        <span className="edublink-pagination-icon icon-east"></span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    )}
                                </>
                            ) : (
                                <NoData />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Workshop;
