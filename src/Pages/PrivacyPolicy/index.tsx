import { Queries } from "../../Api";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import Loader from "../../Components/Common/Loader";
import { LEGALITY_TYPE } from "../../Constants";

const PrivacyPolicy = () => {
  const { data, isLoading } = Queries.useGetLegality(LEGALITY_TYPE.PRIVACY);

  return (
    <>
      <Loader loading={isLoading} />
      <div id="privacy-policy">
        <section>
          <BreadCrumb title="Privacy Policy" />
        </section>

        <section className="container my-10!">
          <div
            dangerouslySetInnerHTML={{
              __html: data?.data.content || "",
            }}
          />
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;
