import db from '@/lib/db';
import React from 'react';
import { CreateServerForm } from '../forms/CreateServerForm';
import SidebarItems from './SidebarItems';

async function Sidebar() {
  const servers = await db.server.findMany({
    include: { Channel: true, Member: true },
  });
  return (
    <div className="p-3 bg-slate-900 flex flex-col items-center gap-2 h-[78.5vh]">
      <div>
        <CreateServerForm />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        {servers.map((server) => (
          <SidebarItems key={server.id} server={server} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
