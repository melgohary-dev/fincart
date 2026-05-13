import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { useQuoteStore } from '@/store/quoteStore';
import type { CountryCode, QuoteFormData } from '@/types';

const countryCodeSet = new Set<CountryCode>(COUNTRY_CODES);

const quoteSchema = z
  .object({
    origin: z
      .string()
      .min(1, 'Please select an origin country')
      .refine((val): val is CountryCode => countryCodeSet.has(val as CountryCode), {
        message: 'Please select a valid origin country',
      }),
    destination: z
      .string()
      .min(1, 'Please select a destination country')
      .refine((val): val is CountryCode => countryCodeSet.has(val as CountryCode), {
        message: 'Please select a valid destination country',
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
    formState: { errors },
    trigger,
    reset,
    getValues,
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
  const watchedWeight = useWatch({ control, name: 'weight' });
  const watchedVolume = useWatch({ control, name: 'volume' });

  useEffect(() => {
    setOrigin(watchedOrigin);
  }, [watchedOrigin, setOrigin]);

  useEffect(() => {
    setDestination(watchedDestination);
  }, [watchedDestination, setDestination]);

  useEffect(() => {
    if (typeof watchedWeight === 'number') setWeight(watchedWeight);
  }, [watchedWeight, setWeight]);

  useEffect(() => {
    if (typeof watchedVolume === 'number') setVolume(watchedVolume);
  }, [watchedVolume, setVolume]);

  const canNext = useMemo(() => {
    if (step === 0) {
      const origin = getValues('origin');
      return !!origin && !errors.origin;
    }
    if (step === 1) {
      const destination = getValues('destination');
      return !!destination && !errors.destination;
    }
    if (step === 2) {
      const weight = getValues('weight');
      return weight !== '' && !errors.weight;
    }
    return false;
  }, [step, errors, getValues]);

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
    canNext,
    step,
    handleNext,
    handleBack,
    handleSubmit,
    resetForm,
    totalSteps: 3,
  };
}
