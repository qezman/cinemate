import Image from 'next/image';

// Same posters, no rotation, no WebGL - used for prefers-reduced-motion
// and whenever the real scene fails to mount.
export function PosterFanFallback({ urls }: { urls: string[] }) {
  const mid = (urls.length - 1) / 2;

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
      {urls.map((url, i) => (
        <div
          key={url}
          className="absolute left-1/2 top-1/2 aspect-[2/3] w-32 overflow-hidden rounded-sm shadow-lg"
          style={{
            transform: `translate(-50%, -50%) translateX(${(i - mid) * 40}px) rotate(${(i - mid) * 6}deg)`,
            zIndex: i,
          }}
        >
          <Image src={url} alt="" fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
