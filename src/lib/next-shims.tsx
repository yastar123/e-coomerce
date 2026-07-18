import {
  Link as TSLink,
  useRouter as useTSRouter,
  useParams as useTSParams,
  useRouterState,
} from "@tanstack/react-router";
import type { AnchorHTMLAttributes, CSSProperties, ImgHTMLAttributes, ReactNode } from "react";

// Minimal shims so ported Next.js pages compile inside TanStack Start.

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
  to?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  children?: ReactNode;
};

export function Link({ href, to, onClick, replace, prefetch: _p, scroll: _s, children, ...rest }: LinkProps) {
  const target = (href ?? to ?? "#") as string;
  const router = useTSRouter();
  return (
    <a
      href={target}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0 ||
          rest.target === "_blank" ||
          target.startsWith("http") ||
          target.startsWith("mailto:") ||
          target.startsWith("tel:")
        ) {
          onClick?.(e);
          return;
        }
        e.preventDefault();
        router.navigate({ to: target as unknown as "/", replace });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Link;

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  alt?: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
};

export function Image({
  src,
  alt = "",
  width,
  height,
  fill,
  priority: _pr,
  unoptimized: _u,
  quality: _q,
  sizes: _sz,
  placeholder: _pl,
  blurDataURL: _b,
  style,
  className,
  ...rest
}: ImageProps) {
  const resolved = typeof src === "string" ? src : src?.src;
  const finalStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...(style ?? {}),
      }
    : style;
  return (
    <img
      src={resolved}
      alt={alt}
      width={fill ? undefined : (width as number | undefined)}
      height={fill ? undefined : (height as number | undefined)}
      style={finalStyle}
      className={className}
      {...rest}
    />
  );
}

// next/navigation shims
export function useRouter() {
  const r = useTSRouter();
  return {
    push: (to: string) => r.navigate({ to: to as unknown as "/" }),
    replace: (to: string) => r.navigate({ to: to as unknown as "/", replace: true }),
    back: () => r.history.back(),
    forward: () => r.history.forward(),
    refresh: () => r.invalidate(),
    prefetch: (_to: string) => {},
  };
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useTSParams({ strict: false }) as T;
}

export function usePathname(): string {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function useSearchParams(): URLSearchParams {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  return new URLSearchParams(search ?? "");
}

// Silence unused warning
void TSLink;
