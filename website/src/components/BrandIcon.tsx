import Image from 'next/image';

type BrandName =
  'java' | 'spring' | 'kotlin' | 'graalvm' | 'maven' | 'gradle' | 'github';

export function BrandIcon({
  name,
  size = 17,
}: {
  name: BrandName;
  size?: number;
}) {
  return (
    <Image
      className="brand-icon"
      src={`/brands/${name}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      unoptimized
    />
  );
}
