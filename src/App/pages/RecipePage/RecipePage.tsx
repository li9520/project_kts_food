import React from "react";

import PageStore from "@store/PageStore";
import { Meta } from "@store/PageStore/types";
import { useLocalStore } from "@utils/useLocalStote";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import RenderPage from "./components/RenderPage";

const RecipePage = () => {
  const pageStore = useLocalStore(() => new PageStore());
  const { id } = useParams();

  React.useEffect(() => {
    pageStore.getOrganizationRecipe(id as string);
  }, [id, pageStore]);

  return pageStore.meta === Meta.success ? (
    <RenderPage recipe={pageStore.data} />
  ) : (
    <RenderPage loading />
  );
};

export default observer(RecipePage);
