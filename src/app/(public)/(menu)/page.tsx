import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from "@tanstack/react-query";

import MenuContainer from "@/feature/menu/ui/MenuContainer";
import { prefetchMenuListAtServer } from "@/feature/menu/model/query/queries.server";

const MenuPage = async () => {
  const qc = new QueryClient();
  await prefetchMenuListAtServer(qc);
  const state = dehydrate(qc);

  return (
    <HydrationBoundary state={state}>
      <MenuContainer />
    </HydrationBoundary>
  );
};

export default MenuPage;
