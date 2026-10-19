/** Normalise Astro.url.pathname (which ends in .html with build.format 'file') to the public path. */
export function publicPath(pathname: string): string {
  const path = pathname.replace(/\.html$/, '').replace(/\/index$/, '/').replace(/(.)\/$/, '$1');
  return path === '' ? '/' : path;
}

export function isCurrent(pathname: string, href: string): boolean {
  const path = publicPath(pathname);
  return path === href || path.startsWith(`${href}/`);
}
