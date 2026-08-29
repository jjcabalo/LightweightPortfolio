import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Format the slug back into a title for display
  const title = resolvedParams.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen text-[var(--theme-fg)] selection:bg-[var(--theme-fg)] selection:text-[var(--theme-bg)] pt-24 px-6 md:px-12 pb-32">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-[#ffffff]">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:opacity-60 transition-opacity text-[#ffffff]">
          JOHN.BLOG
        </Link>
        <Link href="/blog" className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest hover:line-through transition-all text-[#ffffff] h-12">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="mt-20 border-b border-neutral-800 pb-12 mb-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Oct 12, 2025</span>
          <span className="w-1 h-1 bg-neutral-500 rounded-full"></span>
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Essay</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.9] max-w-7xl">
          {title}
        </h1>
      </header>

      {/* Post Content Wrapper */}
      <article className="max-w-7xl mx-auto flex flex-col gap-8 font-sans text-lg md:text-xl text-neutral-400 leading-relaxed">
        <p className="text-[var(--theme-fg)] text-2xl md:text-3xl font-medium leading-snug font-sans italic mb-4">
          This is a simulated dynamic transmission. The brutalist structures of modern web dictate that form must follow function, but who says function cannot be a performance?
        </p>
        
        <p>
          We are entering an era where standard layout paradigms are dying. The typical container, the standard margin, the drop shadowâ€”they are relics of a time when we tried to make screens look like physical objects. But a screen is not a desk. It is a canvas made of light.
        </p>

        {/* Media Breakpoint */}
        <div className="my-12 w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden flex items-center justify-center grayscale relative border border-neutral-800">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-50" />
           <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-white mix-blend-difference">Media asset loaded</span>
        </div>

        <h2 className="font-display text-3xl md:text-4xl text-[var(--theme-fg)] uppercase tracking-tight mt-8 mb-4">
          The Canvas of Light
        </h2>
        
        <p>
          High-contrast typography, massive sweeping scrolling sequences, and pure CSS brutalism force the user to interact with the raw digital nature of the medium. We strip away the unnecessary padding to reveal the stark, undeniable truth of the grid.
        </p>

        <p>
          When you hover, you shouldn't just see a slight color change. You should feel an impact. A reversal of the polarity. The background goes bright, the text goes dark, and for a fraction of a second, the entire energy of the page shifts. That is what we are building here.
        </p>
      </article>

      {/* Read Next Section */}
      <section className="mt-32 max-w-7xl mx-auto pt-16">
        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter mb-12">
          READ NEXT
        </h2>
        <div className="flex flex-col divide-y divide-neutral-800 border-t border-b border-neutral-800">
          {[
            { title: "The Death of the Drop Shadow", slug: "the-death-of-the-drop-shadow", date: "Oct 12, 2025", tag: "Design", readTime: "5 MIN", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "Exploring how brutalism and flat design killed the drop shadow, and why high-contrast borders are taking over modern interfaces." },
            { title: "Why Web3 Needs Typography", slug: "why-web3-needs-typography", date: "Sep 04, 2025", tag: "Web3", readTime: "4 MIN", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80", desc: "The blockchain space is saturated with generic 3D assets. Here's why strong, distinct typographic systems are the true key to building trust." },
            { title: "Motion as Function", slug: "motion-as-function", date: "Aug 18, 2025", tag: "UX", readTime: "7 MIN", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80", desc: "Animation on the web shouldn't just be decoration. How to use functional motion to guide user focus and reduce cognitive load." },
            { title: "Optimizing Three.js", slug: "optimizing-three-js", date: "Jul 22, 2025", tag: "Dev", readTime: "6 MIN", img: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&q=80", desc: "A deep dive into WebGL performance. Techniques for managing draw calls and memory leaks in complex browser scenes." }
          ]
            .filter((post) => post.slug !== resolvedParams.slug)
            .slice(0, 3)
            .map((post, i) => (
            <div
              key={i}
            >
              <Link href={"/blog/" + post.slug} className="group flex flex-col md:flex-row gap-0 hover:bg-white hover:text-black transition-all duration-300 cursor-crosshair -mx-6 md:-mx-12 px-6 md:px-12 text-white">
                <div className="hidden md:block w-[260px] lg:w-[320px] shrink-0 self-stretch overflow-hidden bg-neutral-900 border-r border-neutral-800 group-hover:border-neutral-300 transition-colors">
                  <div className="relative h-full min-h-[220px] overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 py-8 md:px-10 gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tighter transition-all line-clamp-2">{post.title}</h3>
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-700 transition-colors">
                      {post.date} &nbsp;Â·&nbsp; {post.readTime} READ &nbsp;Â·&nbsp; {post.tag}
                    </p>
                  </div>

                  <div className="block md:hidden w-full h-[200px] overflow-hidden bg-neutral-900 mt-4 mb-4 border border-neutral-800">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  <p className="font-sans text-neutral-400 group-hover:text-neutral-800 transition-colors text-sm md:text-base leading-relaxed line-clamp-2 mb-4">
                    {post.desc}
                  </p>

                  <div className="flex justify-between items-center mt-auto border-t border-neutral-800 group-hover:border-neutral-300 pt-6 transition-colors">
                    <span className="inline-block px-5 py-2.5 border border-neutral-700 group-hover:border-black rounded-full font-mono text-[10px] tracking-widest font-bold uppercase transition-colors text-neutral-300 group-hover:text-black">READ ARTICLE</span>
                    <ArrowUpRight size={24} className="text-neutral-500 group-hover:text-black transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </div>
            ))}
        </div>
      </section>

    </main>
  );
}

