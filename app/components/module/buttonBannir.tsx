'use client'

import { bannir } from "@/src/db/lib/adminActions"

export default function BouttonBannir({ userId }: { userId: string }) {
  return (
    <button
      onClick={() => bannir(userId)}
      className="flex items-center gap-1.5 text-xs font-mono text-white bg-red-400 border border-red-400 px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-150"
    >
      Bannir
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    </button>
  );
}