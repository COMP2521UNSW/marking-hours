'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Decimal from 'decimal.js';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { submitMarkingHours } from '@/api/api';
import { Button } from '@/components/ui/base/button/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/base/form/form';
import { Input } from '@/components/ui/base/input/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/base/radio-group/radio-group';
import { Text } from '@/components/ui/base/typography/typography';
import type { Assessment, Entry } from '@/lib/types';

const HOURS_PATTERN = /^ *(\d+\.?|\d*\.\d+) *$/;
const MAX_NOTE_LEN = 256;

const formSchema = z.object({
  assessmentId: z.string({ required_error: 'Please select an assessment' }),
  hours: z
    .string({ required_error: 'Please enter your total marking hours' })
    .min(1, 'Please enter your total marking hours')
    .regex(HOURS_PATTERN, 'Invalid number of hours')
    .refine((value) => {
      const hours = Number(value);
      return hours >= 0;
    }, {
      message: 'Invalid number of hours',
    }),
  note: z.string().max(MAX_NOTE_LEN),
});

type FormInputs = z.infer<typeof formSchema>;

export default function UpdateHoursForm({
  assessments,
  entries,
  onUpdated,
  onCancelled,
}: {
  assessments: Assessment[];
  entries: Entry[];
  onUpdated: (assessmentId: string, hours: number) => void;
  onCancelled: () => void;
}) {
  const form = useForm<FormInputs>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: '',
    },
  });

  const [ origHours, setOrigHours ] = React.useState<number | null>(null);
  const [ hoursInput, setHoursInput ] = React.useState<string>('');
  const [ hoursHint, setHoursHint ] = React.useState('');

  const [ submitting, setSubmitting ] = React.useState(false);

  const onAssessmentChange = (assessmentId: string) => {
    const entry = entries.find((e) => e.assessment.id === assessmentId);
    const hours = entry !== undefined ? entry.hours : 0;
    setOrigHours(hours);
    updateHoursHint(hours, hoursInput);
  };

  const onHoursChange = (hours: string) => {
    setHoursInput(hours);
    updateHoursHint(origHours, hours);
  };

  const updateHoursHint = (origHours: number | null, hoursInput: string) => {
    if (origHours !== null && HOURS_PATTERN.test(hoursInput)) {
      const newHours = parseFloat(hoursInput);
      const diff = new Decimal(newHours).minus(new Decimal(origHours));
      setHoursHint(diffToHint(diff.toNumber()));
    } else {
      setHoursHint('');
    }
  };

  const diffToHint = (diff: number) => {
    if (diff !== 0) {
      const absDiff = Math.abs(diff);
      return (
        `(${diff > 0 ? 'adding' : 'subtracting'} ` +
        `${absDiff} hour${absDiff === 1 ? '' : 's'})`
      );
    } else {
      return '(no change)';
    }
  };

  const onSubmit = async (values: FormInputs) => {
    const hours = Number(values.hours);
    setSubmitting(true);
    try {
      await submitMarkingHours(values.assessmentId, hours, values.note);
      toast.success('Marking hours updated!');
      onUpdated(values.assessmentId, hours);
    } catch {
      toast.error('An error occurred.', {
        description: 'Please try again later. If the problem persists, please contact a course admin.',
        duration: 6000,
      });
    }
    setSubmitting(false);
  };

  const onCancelClick = () => {
    onCancelled();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="assessmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assessment</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(assessmentId: string) => {
                    onAssessmentChange(assessmentId);
                    field.onChange(assessmentId);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col rounded-md border border-input p-2 bg-transparent text-base shadow-xs"
                >
                  {assessments.length === 0 ? (
                    <Text>No assessments to select</Text>
                  ) : (
                    assessments.map((a) => (
                      <FormItem key={a.id} className="flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={a.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {a.name}
                        </FormLabel>
                      </FormItem>
                    ))
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage className="-mt-1.5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="hours">
                Total marking hours
                <span className="text-muted-foreground">
                  (to the nearest 0.5 hours)
                </span>
              </FormLabel>
              <FormControl>
                <div className="relative flex">
                  <Input
                    id="hours"
                    maxLength={4}
                    placeholder={`${origHours !== null ? `${origHours}` : ''}`}
                    onChange={(e) => {
                      onHoursChange(e.target.value);
                      field.onChange(e);
                    }}
                  />
                  <span className="self-center absolute right-2 text-sm text-muted-foreground">
                    {hoursHint}
                  </span>
                </div>
              </FormControl>
              <FormMessage className="-mt-1.5" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note <span className="text-muted-foreground">(optional)</span></FormLabel>
              <FormControl>
                <Input maxLength={MAX_NOTE_LEN} placeholder="Note" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          loading={submitting}
          className="w-full" variant="default" type="submit"
        >
          Submit
        </Button>

        <Button
          className="w-full" variant="outline" type="button"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
}
