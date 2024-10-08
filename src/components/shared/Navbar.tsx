import React from 'react';
import UserButton from '../auth/UserButton';
import { getUserServer } from '@/hooks/getUserServert';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import SocketIndicator from './SocketIndicator';

async function Navbar() {
  const user = await getUserServer();
  return (
    <div className="px-10 shadow-md py-5 flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl">
        💬 Discord
      </Link>

      <div className="flex items-center justify-center gap-1">
        <ThemeToggle />
        <div>
          {user ? (
            <UserButton user={user} />
          ) : (
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>
        <SocketIndicator />
      </div>
    </div>
  );
}

export default Navbar;
