import { z } from 'zod';

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Parent's name must be at least 2 characters.").max(100),
  childName: z.string().trim().min(2, "Child's name must be at least 2 characters.").max(100),
  grade: z.string().trim().min(1, 'Grade is required.').max(50),
  email: z.string().trim().email('Please enter a valid email address.').max(254).toLowerCase(),
  phone: z.string().trim().max(25).regex(/^\+?[0-9\s()-]+$/, 'Please enter a valid phone number.')
    .refine(value => {
      const digits = value.replace(/\D/g, '').length;
      return digits >= 8 && digits <= 15;
    }, 'Please enter a valid phone number.'),
});

export type EnquiryFormInput = z.infer<typeof enquirySchema>;
