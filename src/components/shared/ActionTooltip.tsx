import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type Props = {
  children: React.ReactNode;
  name: string;
};

function ActionTooltip({ children, name }: Props) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align="center" side="right">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default ActionTooltip;
