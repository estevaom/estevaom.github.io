// Star counts, fetched at build time. If GitHub is unreachable or rate-limited the count is
// left off rather than shown stale. Cached per process so the dev server doesn't refetch on every reload.
const cache = new Map<string, Promise<number | null>>();

export function starCount(repo: string): Promise<number | null> {
  if (!cache.has(repo)) cache.set(repo, fetchStars(repo));
  return cache.get(repo)!;
}

async function fetchStars(repo: string): Promise<number | null> {
  const headers: Record<string, string> = { accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const body = await res.json();
    return typeof body.stargazers_count === "number" ? body.stargazers_count : null;
  } catch {
    return null;
  }
}
