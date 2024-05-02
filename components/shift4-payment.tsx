'use client';

import { useRef, useState, useTransition } from 'react';
import Script from 'next/script';

import { toast } from 'sonner';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { Label } from '#/components/ui/label';
import { Loader } from '#/components/loader';

const SHIFT4_SCRIPT_URL = 'https://js.dev.shift4.com/shift4.js';
const SHIFT4_PUBLIC_KEY = process.env.NEXT_PUBLIC_SHIFT4_PUBLIC_KEY;

type Shift4Error = {
  code: string;
  type: string;
  message: string;
};

export const Shift4Payment = () => {
  const shift4 = useRef<any>(null);
  const components = useRef<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onPaymentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // reset error message
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const token = await shift4.current.createToken(components.current);
        console.log({ token });
        // send token to your server
        toast.success(`Token: ${token.id}`, {
          description:
            'Send this token to your server to complete the payment.',
        });
      } catch (error) {
        const shift4Error = error as Shift4Error;
        setErrorMessage(shift4Error.message);
      }
    });
  };

  return (
    <>
      <form
        method='post'
        id='payment-form'
        onSubmit={onPaymentFormSubmit}
      >
        <Card>
          <CardHeader>
            <CardTitle>Card Payment</CardTitle>
            <CardDescription>
              Use any of{' '}
              <a
                href='https://dev.shift4.com/docs/testing'
                target='_blank'
                rel='noreferrer'
                className='text-primary underline'
              >
                these cards
              </a>{' '}
              to test the integration.
            </CardDescription>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-4'>
            <div className='col-span-2 space-y-2'>
              <Label>Card Number</Label>
              <div
                data-shift4='number'
                className='form-control h-10 rounded-md border border-input px-3 py-2'
              />
            </div>
            <div className='space-y-2'>
              <Label>Expiration</Label>
              <div
                data-shift4='expiry'
                className='form-control h-10 rounded-md border border-input px-3 py-2'
              />
            </div>
            <div className='space-y-2'>
              <Label>Cvc</Label>
              <div
                data-shift4='cvc'
                className='form-control h-10 rounded-md border border-input px-3 py-2'
              />
            </div>
            {errorMessage && (
              <Label className='text-destructive'>{errorMessage}</Label>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type='submit'
              className='w-full rounded-full'
              disabled={isPending}
            >
              {isPending && <Loader className='mr-2 size-4 animate-spin' />}
              Pay by Card
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Script
        src={SHIFT4_SCRIPT_URL}
        onReady={() => {
          // @ts-expect-error
          shift4.current = Shift4(SHIFT4_PUBLIC_KEY);
          components.current = shift4.current
            .createComponentGroup()
            .automount('#payment-form');
        }}
        onError={(e) => {
          console.error('Shift4 script error:', e);
        }}
      />
    </>
  );
};
