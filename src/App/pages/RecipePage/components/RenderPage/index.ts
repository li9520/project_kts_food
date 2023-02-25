import LoadingHOC from "@app/components/LoadingHOC";

import RenderPage from "./RenderPage";

const WrapperPage = LoadingHOC(RenderPage, "title");
export default WrapperPage;
export * from "./RenderPage";
