export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between py-4 px-6 bg-gray-50 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Placeholder Space</h2>
      <button className="flex items-center gap-2 py-1 px-3 bg-white rounded-full border border-gray-200">
        <div className="size-7 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-300">A</span>
        </div>
        <p className="text-sm font-medium">Admin User</p>
      </button>
    </header>
  );
}
