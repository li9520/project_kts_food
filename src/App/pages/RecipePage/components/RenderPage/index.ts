import LoadingHOC from "@app/components/LoadingHOC";

import RenderPage from "./RenderPage";

const WrapperPage = LoadingHOC(RenderPage, "loading");
export default WrapperPage;
export * from "./RenderPage";
