import GitHubIcon from "@mui/icons-material/GitHub";

export default function DemoBanner() {
  return (
    <div className="h-9 bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="flex items-center gap-3 text-xs sm:text-sm">
        <span className="font-medium">Demo Project</span>

        <span className="text-white/40">|</span>

        <a
          href="https://github.com/notFrost/admin-dashboard"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-white/90 hover:text-white"
        >
          <GitHubIcon fontSize="inherit" />
          <span>Source</span>
        </a>

        <span className="text-white/40">|</span>

        <a
          href="https://admin-dashboard-theta-beige-70.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="text-white/90 hover:text-white"
        >
          Live
        </a>
      </div>
    </div>
  );
}
