import GitHubIcon from "@mui/icons-material/GitHub";

export default function DemoBanner() {
  return (
    <div className="h-9 bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="flex items-center gap-3 text-xs sm:text-sm">
        <span className="font-medium">Demo project</span>

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

        {/* After deploy add this */}
        {/*
        <span className="text-white/40">|</span>
        <a
          href="https://YOUR_DEPLOY_URL"
          target="_blank"
          rel="noreferrer"
          className="text-white/90 hover:text-white"
        >
          Live
        </a>
        */}
      </div>
    </div>
  );
}
