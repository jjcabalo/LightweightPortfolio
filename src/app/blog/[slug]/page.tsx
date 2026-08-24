import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Format the slug back into a title for display
  const title = resolvedParams.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen pt-24 px-6 md:px-12 pb-32">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter transition-all">
          JOHN.
        </Link>
        <Link href="/" className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:line-through transition-all">
          <ArrowLeft size={16} /> Back
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="mt-20 border-b border-neutral-800 pb-12 mb-16">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Oct 12, 2025</span>
          <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Essay</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] max-w-5xl">
          {title}
        </h1>
      </header>

      {/* Post Content Wrapper */}
      <article className="max-w-3xl mx-auto flex flex-col gap-8 font-sans text-lg md:text-xl text-neutral-400 leading-relaxed">
        <p className="text-white text-2xl md:text-3xl font-medium leading-snug font-sans italic mb-4">
          This is a simulated dynamic transmission. The brutalist structures of modern web dictate that form must follow function, but who says function cannot be a performance?
        </p>
        
        <p>
          We are entering an era where standard layout paradigms are dying. The typical container, the standard margin, the drop shadow—they are relics of a time when we tried to make screens look like physical objects. But a screen is not a desk. It is a canvas made of light.
        </p>

        {/* Media Breakpoint */}
        <div className="my-12 w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden flex items-center justify-center grayscale relative">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50" />
           <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-white mix-blend-difference">Media asset loaded</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-tight mt-8 mb-4">
          The Canvas of Light
        </h2>
        
        <p>
          High-contrast typography, massive sweeping scrolling sequences, and pure CSS brutalism force the user to interact with the raw digital nature of the medium. We strip away the unnecessary padding to reveal the stark, undeniable truth of the grid.
        </p>

        <p>
          When you hover, you shouldn't just see a slight color change. You should feel an impact. A reversal of the polarity. The background goes bright, the text goes dark, and for a fraction of a second, the entire energy of the page shifts. That is what we are building here.
        </p>
      </article>

    </main>
  );
}
