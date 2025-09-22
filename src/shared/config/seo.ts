import type { Metadata } from "next";
import { defaultMetaConfig } from "@/shared/config/site";

const toAbsoluteUrl = (path?: string) => {
  if (!path) return defaultMetaConfig.url;
  return path.startsWith("http")
    ? path
    : `${defaultMetaConfig.url}${path.startsWith("/") ? "" : "/"}${path}`;
};

/**
 * 메타데이터 생성
 * @param input - title, description, canonicalPath, ogImage, robots, keywords, other
 * @returns 메타데이터 객체
 */
const buildMetadata = (
  input: {
    title?: string | Metadata["title"];
    description?: string;
    canonicalPath?: string;
    ogImage?: string | string[];
    robots?: Metadata["robots"];
    keywords?: string[];
    other?: Metadata["other"];
  } = {}
): Metadata => {
  const title = input.title ?? {
    default: defaultMetaConfig.name,
    template: `%s | ${defaultMetaConfig.name}`,
  };
  const description = input.description ?? defaultMetaConfig.description;
  const canonical = toAbsoluteUrl(input.canonicalPath ?? "/");

  const imagesArr = Array.isArray(input.ogImage)
    ? input.ogImage
    : [input.ogImage ?? defaultMetaConfig.ogImage];
  const ogImages = imagesArr.map((i) => ({
    url: toAbsoluteUrl(i),
    width: 1200,
    height: 630,
    alt: defaultMetaConfig.name,
    type: "image/png" as const,
  }));

  return {
    title,
    description,
    metadataBase: new URL(defaultMetaConfig.url),
    alternates: { canonical },
    icons: defaultMetaConfig.icons,
    openGraph: {
      title: typeof title === "string" ? title : defaultMetaConfig.name,
      description,
      url: canonical,
      siteName: defaultMetaConfig.name,
      images: ogImages,
      locale: "ko_KR",
      type: "website",
    },
    robots: input.robots,
    keywords: input.keywords,
    other: input.other,
  };
};

export default buildMetadata;
