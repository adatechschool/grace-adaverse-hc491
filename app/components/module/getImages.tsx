export function getGithubImage(url: string): string | null {
  const parts = url.split("/");
  const user = parts[3];
  const repo = parts[4];
  if (!user || !repo) return null;
  return `https://raw.githubusercontent.com/${user}/${repo}/main/thumbnail.png`;
}

export function getFallback(url : string) : string {
    const parts = url.split("/");
    const user = parts[3];
    const repo = parts[4];

    return `https://opengraph.githubassets.com/1/${user}/${repo}`
  }