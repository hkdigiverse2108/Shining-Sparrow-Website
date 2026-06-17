import { Queries } from "../../Api";
import { BreadCrumb } from "../../Components/Common";
import { LEGALITY_TYPE } from "../../Constants";
import Loader from "../../Components/Common/Loader";

const ReturnPolicy = () => {
  const { data, isLoading } = Queries.useGetLegality(LEGALITY_TYPE.REFUND);

  return (
    <>
      <Loader loading={isLoading} />
      <div>
        <BreadCrumb title="Return Policy" />
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

export default ReturnPolicy;
