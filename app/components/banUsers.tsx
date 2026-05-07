"use client";
import { bannir, debannir } from "@/src/db/lib/adminActions";
import { useState } from "react";

interface UserProps {
  usersBannis: {
    id: string;
    name: string;
    admin: boolean;
    email: string;
    emailVerified: boolean;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  usersPasBannis: {
    id: string;
    name: string;
    admin: boolean;
    email: string;
    emailVerified: boolean;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export default function BanUsers({ usersBannis, usersPasBannis }: UserProps) {
  const [selectId, setSelectId] = useState("");

  return (
    <div className="space-y-6">
      {/* Utilisateurs bannis */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* En-tête section */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-red-50">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-red-400"
            >
              <path
                fillRule="evenodd"
                d="M13.562 1.194a.75.75 0 0 1 .688.42l.928 1.876A2.25 2.25 0 0 0 16.186 4.5l1.876.928a.75.75 0 0 1 0 1.344l-1.876.928a2.25 2.25 0 0 0-1.008 1.01l-.928 1.876a.75.75 0 0 1-1.344 0l-.928-1.876a2.25 2.25 0 0 0-1.01-1.008L9.094 6.774a.75.75 0 0 1 0-1.344l1.876-.928a2.25 2.25 0 0 0 1.008-1.01l.928-1.876a.75.75 0 0 1 .656-.422ZM3 11.25a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm11.5 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm-9.5 4a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm5 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-sm font-bold text-red-700 font-mono uppercase tracking-widest">
              Utilisateurs bannis
            </h2>
          </div>
          <span className="text-xs font-mono text-red-500 bg-red-100 border border-red-200 px-2 py-0.5 rounded">
            {usersBannis.length}
          </span>
        </div>

        {/* Liste */}
        {usersBannis.length === 0 ? (
          <p className="text-sm text-slate-400 font-mono text-center py-8">
            Aucun utilisateur banni
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {usersBannis.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar initiale */}
                  <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-xs font-bold text-red-500 font-mono">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => debannir(user.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-500
                             border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                             px-3 py-1.5 rounded-lg transition-all duration-150"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  Débannir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bannir un utilisateur */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 text-slate-400"
          >
            <path
              fillRule="evenodd"
              d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-sm font-bold text-slate-700 font-mono uppercase tracking-widest">
            Bannir un utilisateur
          </h2>
        </div>

        <div className="px-5 py-4 flex items-center gap-3">
          {/* Select */}
          <div className="relative flex-1">
            <select
              onChange={(e) => setSelectId(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-700 bg-white
                         border border-slate-200 rounded-lg outline-none appearance-none
                         focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                         transition-all duration-150 pr-8"
            >
              <option value="">Choisissez un utilisateur…</option>
              {usersPasBannis.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.email}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12 8"
              className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
            >
              <path d="M1 1l5 5 5-5" />
            </svg>
          </div>

          {/* Bouton bannir */}
          <button
            onClick={() => bannir(selectId)}
            disabled={!selectId}
            className="flex items-center gap-1.5 text-sm font-medium
                       bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed
                       text-white px-4 py-2 rounded-lg transition-colors duration-150"
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
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            Bannir
          </button>
        </div>
      </div>
    </div>
  );
}
