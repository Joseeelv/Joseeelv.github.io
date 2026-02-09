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

// --- Sub-componente para Bloques de Código ---
const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Detectar lenguaje desde la clase (ej: "language-bash")
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";

  // Si es código en línea (`code`), renderizar simple
  if (inline || !match) {
    return (
      <code
        className="bg-cyan-900/20 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono border border-cyan-500/20"
        {...props}
      >
        {children}
      </code>
    );
  }

  // Lógica de copiado
  const handleCopy = async () => {
    const textToCopy = String(children).replace(/\n$/, "");
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden border border-slate-700/50 bg-[#0f1623] shadow-2xl">
      {/* Cabecera del bloque de código */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Botones decorativos estilo Mac */}
          <div className="flex gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-white/5 transition-all duration-200 cursor-pointer"
        >
          {isCopied ? (
            <>
              <svg
                className="w-3.5 h-3.5 text-green-400"
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
              <span className="text-green-400">Copied!</span>
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

      {/* Contenido del código */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};

// --- Componente Principal ---
export default function CodeBlogPost() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#020617] text-gray-200 flex flex-col items-center pt-24 pb-20 overflow-hidden">
      {/* Fondos ambientales mejorados */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-[10%] right-[5%] w-125 h-125 bg-cyan-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-125 h-125 bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título Principal */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8 drop-shadow-lg">
            Code Walkthrough
          </h1>
          <div className="flex justify-center">
            <div className="w-32">
              <Divider />
            </div>
          </div>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              // Títulos
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-400 mt-12 mb-6 border-b border-gray-800 pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold text-cyan-200 mt-10 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block"></span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-medium text-cyan-100/90 mt-8 mb-3">
                  {children}
                </h3>
              ),

              // Párrafos
              p: ({ children }) => (
                <p className="text-slate-300 leading-7 mb-5">{children}</p>
              ),

              // Enlaces
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 font-medium hover:text-cyan-300 hover:underline decoration-cyan-500/30 underline-offset-4 transition-all"
                >
                  {children}
                </a>
              ),

              // Imágenes con efecto hover y click
              img: ({ src, alt, ...props }) => (
                <figure className="my-8 group relative">
                  <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <img
                    src={src}
                    alt={alt}
                    className="relative w-full rounded-lg border border-slate-700 shadow-2xl bg-slate-900/50 cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                    onClick={() => setSelectedImage(src || null)}
                    {...props}
                  />
                  {alt && (
                    <figcaption className="text-center text-sm text-slate-500 mt-2 italic">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),

              // Bloques de código (Aquí usamos el componente personalizado)
              code: CodeBlock,

              // Sobrescribimos pre para quitar estilos por defecto que interfieran
              pre: ({ children }) => <>{children}</>,

              // Separadores
              hr: () => <div className="my-12 border-t border-slate-800/50" />,
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Full screen"
              className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl shadow-black"
            />
            <button className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors">
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
