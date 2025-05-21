import { z } from 'zod';

/**
 * Input validation utilities
 * 
 * These functions provide robust input validation to prevent
 * injection attacks and ensure data integrity.
 */

/**
 * Sanitize a string input to prevent XSS attacks
 */
export function sanitizeInput(input: string | null | undefined): string {
  if (input === null || input === undefined) {
    return '';
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Please enter a valid email address');

/**
 * Password validation schema
 * 
 * Requires:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine(
    (password) => /[A-Z]/.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => /[a-z]/.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => /[0-9]/.test(password),
    'Password must contain at least one number'
  )
  .refine(
    (password) => /[^A-Za-z0-9]/.test(password),
    'Password must contain at least one special character'
  );

/**
 * Student ID validation schema
 * 
 * Format: STU-XXXXX where X is a digit
 */
export const studentIdSchema = z
  .string()
  .regex(/^STU-\d{5}$/, 'Student ID must be in the format STU-XXXXX');

/**
 * Teacher ID validation schema
 * 
 * Format: TCH-XXXXX where X is a digit
 */
export const teacherIdSchema = z
  .string()
  .regex(/^TCH-\d{5}$/, 'Teacher ID must be in the format TCH-XXXXX');

/**
 * Admin ID validation schema
 * 
 * Format: ADM-XXXXX where X is a digit
 */
export const adminIdSchema = z
  .string()
  .regex(/^ADM-\d{5}$/, 'Admin ID must be in the format ADM-XXXXX');

/**
 * Parent ID validation schema
 * 
 * Format: PAR-XXXXX where X is a digit
 */
export const parentIdSchema = z
  .string()
  .regex(/^PAR-\d{5}$/, 'Parent ID must be in the format PAR-XXXXX');

/**
 * Phone number validation schema
 */
export const phoneNumberSchema = z
  .string()
  .regex(/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number');

/**
 * Date validation schema
 */
export const dateSchema = z.coerce.date();

/**
 * Amount validation schema
 */
export const amountSchema = z.number().positive('Amount must be positive');

/**
 * Validate and sanitize an object against a schema
 */
export function validateAndSanitize<T>(
  data: unknown,
  schema: z.ZodType<T>
): { success: boolean; data?: T; error?: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Validation failed' };
  }
}
