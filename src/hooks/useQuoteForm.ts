import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_CODES } from '@/utils/countryCodes';
import { useQuoteStore } from '@/store/quoteStore';
import type { QuoteFormData } from '@/types';
import { CountryCode, FormStep } from '@/types';

/**
 * Quote calculation form with multi-step wizard, Zod validation, and i18n error messages.
 *
 * Creates a reactive Zod schema on every language change so that validation
 * messages respect the current locale. The resolver is swapped transparently
 * because react-hook-form v7+ picks up resolver changes and re-validates.
 */
export function createQuoteSchema(t: (key: string) => string) {
  const countryCodeSet = new Set<string>(COUNTRY_CODES);

  return z
    .object({
      origin: z
        .string()
        .min(1, t('form.validation.originRequired'))
        .refine((val): val is CountryCode => countryCodeSet.has(val as CountryCode), {
          message: t('form.validation.originRequired'),
        }),
      destination: z
        .string()
        .min(1, t('form.validation.destinationRequired'))
        .refine((val): val is CountryCode => countryCodeSet.has(val as CountryCode), {
          message: t('form.validation.destinationRequired'),
        }),
      weight: z.union([z.number().positive(t('form.package.weight.error')), z.null()]),
      volume: z.union([z.number().positive(t('form.package.volume.error')), z.null()]),
    })
    .refine((data) => !data.origin || !data.destination || data.origin !== data.destination, {
      message: t('form.validation.sameCountry'),
      path: ['destination'],
    });
}

const TOTAL_STEPS = Object.keys(FormStep).length;

export function useQuoteForm() {
  const { t } = useTranslation();
  const storeOrigin = useQuoteStore((s) => s.origin);
  const storeDestination = useQuoteStore((s) => s.destination);
  const storeWeight = useQuoteStore((s) => s.weight);
  const storeVolume = useQuoteStore((s) => s.volume);
  const setOrigin = useQuoteStore((s) => s.setOrigin);
  const setDestination = useQuoteStore((s) => s.setDestination);
  const setWeight = useQuoteStore((s) => s.setWeight);
  const setVolume = useQuoteStore((s) => s.setVolume);

  const [step, setStep] = useState<FormStep>(FormStep.Origin);

  const quoteSchema = useMemo(() => createQuoteSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
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
    if (step === FormStep.Origin) {
      return !!watchedOrigin;
    }
    if (step === FormStep.Destination) {
      return !!watchedDestination && watchedOrigin !== watchedDestination;
    }
    if (step === FormStep.Package) {
      return watchedWeight !== null && watchedWeight > 0;
    }
    return false;
  }, [step, watchedOrigin, watchedDestination, watchedWeight]);

  const handleNext = useCallback(async () => {
    let fieldsToValidate: (keyof QuoteFormData)[];

    if (step === FormStep.Origin) fieldsToValidate = ['origin'];
    else if (step === FormStep.Destination) fieldsToValidate = ['destination'];
    else return;

    const valid = await trigger(fieldsToValidate);
    if (valid) setStep((prev) => (prev + 1) as FormStep);
  }, [step, trigger]);

  const handleBack = useCallback(() => {
    setStep((prev) => Math.max(FormStep.Origin, prev - 1) as FormStep);
  }, []);

  const resetForm = useCallback(() => {
    reset();
    setStep(FormStep.Origin);
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
    totalSteps: TOTAL_STEPS,
  };
}
