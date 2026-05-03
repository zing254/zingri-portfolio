import { getPostData, getSortedPostsData } from '@/lib/blog';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, Terminal } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <article className="max-w-3xl mx-auto relative z-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>cd ..</span>
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {postData.date}
            </div>
            <div className="flex items-center gap-3">
              {postData.tags.map(tag => (
                <div key={tag} className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-secondary" />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glow-text-primary">
            {postData.title}
          </h1>
          
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </header>

        <div 
          className="prose prose-invert prose-primary max-w-none 
          prose-headings:font-heading prose-headings:glow-text-white
          prose-pre:glass prose-pre:border prose-pre:border-white/10
          prose-code:text-primary prose-a:text-secondary hover:prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />

        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full glass border border-primary/30 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-white">Zingri Master</p>
                <p className="text-xs text-muted font-mono">Ethical Hacker & Dev</p>
              </div>
            </div>
            
            <Link href="/blog" className="px-6 py-2 rounded-lg glass border border-white/10 hover:border-primary/50 text-sm font-mono transition-all">
              Back to Terminal
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
