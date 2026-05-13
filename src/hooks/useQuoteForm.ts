import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useState } from 'react';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { useQuoteStore } from '@/store/quoteStore';
import type { QuoteFormData } from '@/types';

const quoteSchema = z
  .object({
    origin: z.string().refine((val) => val === '' || COUNTRY_CODES.includes(val as never), {
      message: 'Please select an origin country',
    }),
    destination: z.string().refine((val) => val === '' || COUNTRY_CODES.includes(val as never), {
      message: 'Please select a destination country',
    }),
    weight: z.union([z.number().positive('Weight must be greater than 0'), z.literal('')]),
    volume: z.union([z.number().positive('Volume must be greater than 0'), z.literal('')]),
  })
  .refine((data) => !data.origin || !data.destination || data.origin !== data.destination, {
    message: 'Origin and destination must be different',
    path: ['destination'],
  });

export function useQuoteForm() {
  const storeOrigin = useQuoteStore((s) => s.origin);
  const storeDestination = useQuoteStore((s) => s.destination);
  const storeWeight = useQuoteStore((s) => s.weight);
  const storeVolume = useQuoteStore((s) => s.volume);
  const setOrigin = useQuoteStore((s) => s.setOrigin);
  const setDestination = useQuoteStore((s) => s.setDestination);
  const setWeight = useQuoteStore((s) => s.setWeight);
  const setVolume = useQuoteStore((s) => s.setVolume);

  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onChange',
    defaultValues: {
      origin: storeOrigin,
      destination: storeDestination,
      weight: storeWeight,
      volume: storeVolume,
    },
  });

  const watchedOrigin = useWatch({ control, name: 'origin' });
  const watchedDestination = useWatch({ control, name: 'destination' });

  useEffect(() => {
    setOrigin(watchedOrigin);
  }, [watchedOrigin, setOrigin]);

  useEffect(() => {
    setDestination(watchedDestination);
  }, [watchedDestination, setDestination]);

  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (typeof watchedValues.weight === 'number') setWeight(watchedValues.weight);
    if (typeof watchedValues.volume === 'number') setVolume(watchedValues.volume);
  }, [watchedValues.weight, watchedValues.volume, setWeight, setVolume]);

  const handleNext = useCallback(async () => {
    let fieldsToValidate: (keyof QuoteFormData)[];

    if (step === 0) fieldsToValidate = ['origin'];
    else if (step === 1) fieldsToValidate = ['destination'];
    else return;

    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((prev) => prev + 1);
  }, [step, trigger]);

  const handleBack = useCallback(() => {
    setStep((prev) => Math.max(0, prev - 1));
  }, []);

  const resetForm = useCallback(() => {
    reset();
    setStep(0);
  }, [reset]);

  return {
    control,
    errors,
    isValid,
    step,
    setStep,
    handleNext,
    handleBack,
    handleSubmit,
    trigger,
    resetForm,
    totalSteps: 3,
  };
}
