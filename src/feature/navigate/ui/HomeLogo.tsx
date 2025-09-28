import Link from "next/link";
import Image from "next/image";

export default function HomeLogo() {
  return (
    <Link href="/" aria-label="홈으로 이동" className="flex items-center gap-2">
      <Image
        src="/img/logo/logo.png"
        alt="싸피코피 로고"
        width={55}
        height={40}
        className="w-[50px] h-auto"
      />
      <span className="text-2xl font-[Moyamoya]">싸피코피</span>
    </Link>
  );
}
