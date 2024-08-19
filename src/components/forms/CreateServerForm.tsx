'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { ServerType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServerSchema } from '@/lib/schemas';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { action_createServer } from '@/actions/server/create-server';
import { useParams } from 'next/navigation';

export function CreateServerForm() {
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const form = useForm<ServerType>({
    resolver: zodResolver(ServerSchema),
    defaultValues: {
      name: '',
    },
  });

  const formSubmit = (formData: ServerType) => {
    startTransition(async () => {
      const res = await action_createServer(formData);

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Server "${formData.name}" created`);
      }
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size={params.serverId ? 'icon' : 'default'}
          className="rounded-full"
        >
          {params.serverId ? (
            <PlusIcon className="h-6 w-6" />
          ) : (
            ' Create Server'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Server</DialogTitle>
          <DialogDescription>
            Make your tasks to be done on time by creating server
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Web Development"
                      className="col-span-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="justify-start">
              <Button disabled={isPending} type="submit">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
