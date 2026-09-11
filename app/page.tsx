import { Suspense } from 'react';
import { SearchInput } from '@/components/home/SearchInput';
import { DiscoverSection } from '@/components/home/DiscoverSection';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-label uppercase tracking-[0.08em] text-text-soft">This week, worth your time.</p>
      <h1 className="mt-3 max-w-2xl font-display text-hero">
        Films worth talking <em className="italic">about.</em>
      </h1>

      <div className="mt-8">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
      </div>

      <div className="mt-16">
        <Suspense fallback={<p className="text-text-soft">Loading films...</p>}>
          <DiscoverSection />
        </Suspense>
      </div>
    </div>
  );
}
