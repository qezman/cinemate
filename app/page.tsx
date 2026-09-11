import { Suspense } from 'react';
import { SearchInput } from '@/components/home/SearchInput';
import { DiscoverSection } from '@/components/home/DiscoverSection';
import { Hero } from '@/components/home/Hero';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-label uppercase tracking-[0.08em] text-text-soft">This week, worth your time.</p>
          <h1 className="mt-3 font-display text-hero">
            Films worth talking <em className="italic">about.</em>
          </h1>
          <div className="mt-8">
            <Suspense fallback={null}>
              <SearchInput />
            </Suspense>
          </div>
        </div>

        <Hero />
      </section>

      <div className="pb-16">
        <Suspense fallback={<p className="text-text-soft">Loading films...</p>}>
          <DiscoverSection />
        </Suspense>
      </div>
    </div>
  );
}
