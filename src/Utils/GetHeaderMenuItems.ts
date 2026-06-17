import { ROUTES } from "../Constants";
import type { MenuItem } from "../Types";
// import { useAppSelector } from "../Store/Hook";
// import type { WorkshopType } from "../Types";

export const GetHeaderMenuItems = (): MenuItem[] => {
  // const workshop: WorkshopType[] = useAppSelector((state) => state.workshops.AllWorkshop);

  // let workshopLink = ROUTES.WORKSHOP.WORKSHOP;

  // if (workshop?.length === 1) {
  //   const id = workshop[0]?._id ?? "";
  //   workshopLink = ROUTES.WORKSHOP.DETAILS.replace(":id", id);
  // }

  return [
    { Title: "Home", link: ROUTES.HOME },
    { Title: "Workshop", link: ROUTES.WORKSHOP.BASE },
    {
      Title: "Course",
      link: ROUTES.COURSE.BASE,
    },
    {
      Title: "Blog",
      link: ROUTES.BLOG.BASE,
    },
    {
      Title: "Contact",
      link: ROUTES.CONTACT,
    },
    // {
    //   Title: "Download Now",
    //   child: [
    //     { Title: "Android App", link: "" },
    //     { Title: "IOS App", link: "" },
    //   ],
    // },
  ];
};
