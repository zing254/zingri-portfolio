import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { Calendar, Tag, ArrowRight, Terminal } from 'lucide-react';

export default function BlogIndex() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030303]">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-primary/10" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-secondary/10" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono text-primary/80">ls -la ./content/blog/</span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
            <span className="glow-text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">
              The Dev Log
            </span>
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            Thoughts, tutorials, and security write-ups from the digital underground.
          </p>
        </div>

        <div className="grid gap-8">
          {allPostsData.map(({ slug, date, title, excerpt, tags }) => (
            <article key={slug} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link href={`/blog/${slug}`}>
                <div className="relative p-8 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {date}
                    </div>
                    <div className="flex items-center gap-3">
                      {tags.map(tag => (
                        <div key={tag} className="flex items-center gap-1" tag-key={tag}>
                          <Tag className="w-3.5 h-3.5 text-secondary" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {title}
                  </h2>
                  <p className="text-muted mb-6 line-clamp-2">
                    {excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-mono text-primary group-hover:gap-3 transition-all">
                    <span>Read Protocol</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors font-mono">
            <span>cd ..</span>
            <span className="text-xs">Return to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
