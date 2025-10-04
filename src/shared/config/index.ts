// 서버 요소를 함께 배럴 익스포트하면 클라이언트 컴포넌트에서 사용 시 금지된 의존으로 인식됨(클라에서 서버 요소를 사용)
// export { getServerClient } from "./supabase/server";
export { getBrowserClient } from "./supabase/client";
export { updateSession } from "./supabase/middleware";

export { buildMetadata } from "./seo";
export { defaultMetaConfig } from "./site";
