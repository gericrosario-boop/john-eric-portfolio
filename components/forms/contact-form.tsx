'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (res.ok) {
      setStatus('Message sent successfully.');
      reset();
    } else {
      setStatus('Unable to send right now, but your message was saved if available.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="name">Name</label>
        <Input id="name" {...register('name')} />
        {errors.name ? <p className="text-xs text-red-500">{errors.name.message}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="email">Email</label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email ? <p className="text-xs text-red-500">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="message">Message</label>
        <Textarea id="message" {...register('message')} />
        {errors.message ? <p className="text-xs text-red-500">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}
