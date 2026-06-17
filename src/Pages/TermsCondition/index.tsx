import { Queries } from "../../Api";
import { BreadCrumb } from "../../Components/Common";
import { LEGALITY_TYPE } from "../../Constants";
import Loader from "../../Components/Common/Loader";

const TermsCondition = () => {
  const { data, isLoading } = Queries.useGetLegality(LEGALITY_TYPE.TERMS);

  return (
    <>
      <Loader loading={isLoading} />
      <div>
        <BreadCrumb title="Terms & Conditions" />
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

export default TermsCondition;
