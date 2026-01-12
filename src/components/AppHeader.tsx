"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/todos"
              className="text-xl font-bold hover:text-primary-600 transition-colors"
            >
              TaskFlow
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {pathname !== "/todos" && (
              <Link href="/todos" className="text-gray-700 hover:text-gray-900">
                My Todos
              </Link>
            )}
            {pathname !== "/profile" && (
              <Link
                href="/profile"
                className="text-gray-700 hover:text-gray-900"
              >
                Profile
              </Link>
            )}
            <span className="text-gray-500">{session.user.name}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
