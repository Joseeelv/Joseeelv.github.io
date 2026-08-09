import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import markdownContent from "./2025-04-23-Code.md?raw";
import Divider from "../../../components/divider";

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;

const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";

  if (inline || !match) {
    return (
      <code
        className="bg-[#00ff41]/5 text-[#00ff41] px-1.5 py-0.5 text-sm font-mono border border-[#00ff41]/10"
        {...props}
      >
        {children}
      </code>
    );
  }

  const handleCopy = async () => {
    const textToCopy = String(children).replace(/\n$/, "");
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] border-b border-[#1a1a1a]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/70"></div>
          </div>
          <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-gray-500 hover:text-[#00ff41] hover:bg-white/5 transition-all duration-200 cursor-pointer"
        >
          {isCopied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-[#00ff41]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[#00ff41]">Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed text-gray-300">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default function CodeBlogPost() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00ff41]/20 to-transparent"></div>
        <div className="absolute top-[10%] right-[5%] w-125 h-125 bg-[#00ff41]/3 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-125 h-125 bg-green-600/3 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-mono matrix-title tracking-tight mb-8">
            Code Walkthrough
          </h1>
          <div className="flex justify-center">
            <div className="w-32 pb-5">
              <Divider />
            </div>
          </div>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-[#00ff41] font-mono mt-12 mb-6 border-b border-[#1a1a1a] pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-green-200 mt-10 mb-4 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00ff41] inline-block"></span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-green-100/80 mt-8 mb-3 font-mono">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-slate-300 leading-7 mb-5 font-sans">
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ff41] font-medium font-mono hover:text-[#00cc33] hover:underline decoration-[#00ff41]/30 underline-offset-4 transition-all text-sm"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt, ...props }) => (
                <figure className="my-8 group relative">
                  <div className="absolute -inset-1 bg-[#00ff41]/10 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <img
                    src={src}
                    alt={alt}
                    className="relative w-full border border-[#1a1a1a] bg-slate-900/50 cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                    onClick={() => setSelectedImage(src || null)}
                    {...props}
                  />
                  {alt && (
                    <figcaption className="text-center text-sm text-gray-500 mt-2 italic font-mono">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
              code: CodeBlock,
              pre: ({ children }) => <>{children}</>,
              hr: () => <div className="my-12 border-t border-[#1a1a1a]" />,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl shadow-black"
            />
            <button className="absolute top-4 right-4 text-gray-500 hover:text-[#00ff41] bg-black/50 hover:bg-black/70 p-2 transition-colors cursor-pointer">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
