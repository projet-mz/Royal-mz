'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from './skeleton';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const renderMarkdown = async () => {
      setLoading(true);
      try {
        const MarkdownIt = (await import('markdown-it')).default;
        const md = new MarkdownIt({
          html: false,
          linkify: true,
          typographer: true,
        });
        setRenderedContent(md.render(content));
      } catch (error) {
        console.error('Error rendering markdown:', error);
        setRenderedContent(`<p>Error rendering content</p>`);
      } finally {
        setLoading(false);
      }
    };

    if (content) {
      renderMarkdown();
    }
  }, [content]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  return (
    <div 
      className={`prose prose-sm md:prose-base lg:prose-lg max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
