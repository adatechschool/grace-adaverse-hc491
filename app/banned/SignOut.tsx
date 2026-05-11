"use client"

import { signout } from "@/src/db/lib/actions"

export default function SignOut() {

    return (
                <a onClick={() => signout()}
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400
                     hover:text-blue-500 transition-colors duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Se déconnecter
        </a>
    )
}