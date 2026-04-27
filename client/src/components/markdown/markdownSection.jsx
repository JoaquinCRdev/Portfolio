import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMarkdownFile } from "../../hooks/useMarkdownFile";

const MarkdownSection = ({ filePath }) => {
  const { markdown, loading } = useMarkdownFile(filePath);

  if (loading) return (
    <div className="flex items-center gap-2 p-4 text-[var(--editor-line-number-fg)] text-sm">
      <span className="animate-pulse">Loading...</span>
    </div>
  );

  return (
    <div className="prose prose-invert max-w-none
      prose-headings:text-[var(--editor-fg)]
      prose-headings:font-semibold
      prose-p:text-[var(--editor-fg)]
      prose-p:leading-relaxed
      prose-a:text-[var(--activitybar-badge-bg)]
      prose-a:no-underline
      hover:prose-a:underline
      prose-strong:text-[var(--editor-fg)]
      prose-code:text-[var(--activitybar-badge-bg)]
      prose-code:bg-[var(--input-bg)]
      prose-code:px-1.5
      prose-code:py-0.5
      prose-code:rounded
      prose-code:text-sm
      prose-code:before:content-none
      prose-code:after:content-none
      prose-pre:bg-[var(--input-bg)]
      prose-pre:border
      prose-pre:border-[var(--sidebar-border)]
      prose-blockquote:border-l-[var(--activitybar-badge-bg)]
      prose-blockquote:text-[var(--editor-line-number-fg)]
      prose-hr:border-[var(--sidebar-border)]
      prose-li:text-[var(--editor-fg)]
      prose-ul:marker:text-[var(--editor-line-number-fg)]
      prose-ol:marker:text-[var(--editor-line-number-fg)]
      prose-th:text-[var(--editor-fg)]
      prose-td:text-[var(--editor-fg)]
      prose-thead:border-[var(--sidebar-border)]
      prose-tbody:divide-[var(--sidebar-border)]"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export { MarkdownSection };