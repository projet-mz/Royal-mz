declare module 'next/font/local' {
  type FontImportOptions = {
    src: Array<{
      path: string;
      weight: string;
      style: string;
    }>;
    variable?: string;
    display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
    preload?: boolean;
    fallback?: string[];
    adjustFontFallback?: boolean | string;
    declarations?: Array<{
      prop: string;
      value: string;
    }>;
  };

  export default function localFont(options: FontImportOptions): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };
}
