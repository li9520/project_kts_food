import LoadingHOC from "@app/components/LoadingHOC";

import Paginate from "./Paginate";

const WrapperPage = LoadingHOC(Paginate, "loading");
export default WrapperPage;
export * from "./Paginate";
