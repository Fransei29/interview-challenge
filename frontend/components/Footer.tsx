"use client";

export default function Footer() {
  return (
    <div className="mt-12 text-center">
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-center space-x-8 text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-medium">Next.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="font-medium">TypeScript</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="font-medium">Tailwind CSS</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Backend: NestJS + TypeORM + SQLite | Built with modern web technologies
        </p>
        <p className="mt-2 text-sm text-gray-400 font-medium">
          Made by Franco Seiler
        </p>
      </div>
    </div>
  );
} 