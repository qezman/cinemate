import Image from 'next/image';
import { buildImageUrl } from '@/lib/tmdb/image';
import type { Cast } from '@/types/movie';

export function CastRow({ cast }: { cast: Cast[] }) {
  if (cast.length === 0) return null;

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {cast.slice(0, 12).map((member) => {
        const photo = buildImageUrl(member.profile_path, 'w200');

        return (
          <div key={member.id} className="w-24 flex-shrink-0">
            <div className="aspect-[2/3] overflow-hidden rounded-sm bg-ink-raised">
              {photo && (
                <Image
                  src={photo}
                  alt={member.name}
                  width={200}
                  height={300}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <p className="mt-2 truncate text-sm font-medium">{member.name}</p>
            <p className="truncate text-caption text-text-soft">{member.character}</p>
          </div>
        );
      })}
    </div>
  );
}
