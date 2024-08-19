'use client';
import { Server } from '@prisma/client';
import React from 'react';
import ActionTooltip from './ActionTooltip';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  server: Server;
};

function SidebarItems({ server }: Props) {
  const params = useParams();
  const router = useRouter();
  return (
    <ActionTooltip name={server.name}>
      <button
        onClick={() => router.push(`/servers/${server.id}`)}
        className="group relative flex items-center uppercase justify-center"
      >
        <div
          className={cn(
            'absolute left-0 rounded-r-full bg-cyan-100 transition-all w-[4px]',
            params.serverId !== server.id && 'group-hover:h-[26px]',
            params.serverId === server.id ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <h1 className=" relative mx-3 w-8 rounded-lg p-1 bg-white text-black">
          {server.name.slice(0, 2)}
        </h1>
      </button>
    </ActionTooltip>
  );
}

export default SidebarItems;
