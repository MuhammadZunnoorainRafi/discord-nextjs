'use client';
import { Channel, Member, Server } from '@prisma/client';
import React from 'react';
import ActionTooltip from './ActionTooltip';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useGetUserClient } from '@/hooks/getUserClient';

type Props = {
  server: Server & { Channel: Channel[]; Member: Member[] };
};

function SidebarItems({ server }: Props) {
  const user = useGetUserClient();
  const params = useParams();
  const router = useRouter();
  return (
    <div className="flex items-start justify-start gap-2">
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
      <div className="flex flex-col items-center justify-center divide-y-2">
        {user &&
          server.Member.map((member) => (
            <Link
              key={member.id}
              href={`/servers/${member.serverId}/member/${member.id}`}
              className="hover:text-slate-400 transition-all"
            >
              {member.profileId.slice(-1)}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SidebarItems;
