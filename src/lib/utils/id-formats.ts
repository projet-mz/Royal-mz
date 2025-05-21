/**
 * ID Format Utilities
 * 
 * This file provides utilities for generating and validating school-appropriate ID formats
 * for different user roles in the Amarck Royal International School Management System.
 */

/**
 * Generate a student ID in the format STU-XXXXX
 * @param sequenceNumber A unique sequence number for the student
 * @returns A formatted student ID
 */
export function generateStudentId(sequenceNumber: number): string {
  return `STU-${String(sequenceNumber).padStart(5, '0')}`;
}

/**
 * Generate a teacher ID in the format TCH-XXXXX
 * @param sequenceNumber A unique sequence number for the teacher
 * @returns A formatted teacher ID
 */
export function generateTeacherId(sequenceNumber: number): string {
  return `TCH-${String(sequenceNumber).padStart(5, '0')}`;
}

/**
 * Generate an admin ID in the format ADM-XXXXX
 * @param sequenceNumber A unique sequence number for the admin
 * @returns A formatted admin ID
 */
export function generateAdminId(sequenceNumber: number): string {
  return `ADM-${String(sequenceNumber).padStart(5, '0')}`;
}

/**
 * Generate a parent ID in the format PAR-XXXXX
 * @param sequenceNumber A unique sequence number for the parent
 * @returns A formatted parent ID
 */
export function generateParentId(sequenceNumber: number): string {
  return `PAR-${String(sequenceNumber).padStart(5, '0')}`;
}

/**
 * Validate if a string is a valid student ID
 * @param id The ID to validate
 * @returns True if the ID is a valid student ID, false otherwise
 */
export function isValidStudentId(id: string): boolean {
  return /^STU-\d{5}$/.test(id);
}

/**
 * Validate if a string is a valid teacher ID
 * @param id The ID to validate
 * @returns True if the ID is a valid teacher ID, false otherwise
 */
export function isValidTeacherId(id: string): boolean {
  return /^TCH-\d{5}$/.test(id);
}

/**
 * Validate if a string is a valid admin ID
 * @param id The ID to validate
 * @returns True if the ID is a valid admin ID, false otherwise
 */
export function isValidAdminId(id: string): boolean {
  return /^ADM-\d{5}$/.test(id);
}

/**
 * Validate if a string is a valid parent ID
 * @param id The ID to validate
 * @returns True if the ID is a valid parent ID, false otherwise
 */
export function isValidParentId(id: string): boolean {
  return /^PAR-\d{5}$/.test(id);
}

/**
 * Extract the sequence number from an ID
 * @param id The ID to extract the sequence number from
 * @returns The sequence number as a number
 */
export function extractSequenceNumber(id: string): number {
  const match = id.match(/^[A-Z]+-(\d{5})$/);
  if (!match) {
    throw new Error(`Invalid ID format: ${id}`);
  }
  return parseInt(match[1], 10);
}

/**
 * Get the next available sequence number for a role
 * @param existingIds An array of existing IDs for the role
 * @returns The next available sequence number
 */
export function getNextSequenceNumber(existingIds: string[]): number {
  if (existingIds.length === 0) {
    return 1;
  }
  
  const sequenceNumbers = existingIds.map(id => {
    try {
      return extractSequenceNumber(id);
    } catch (error) {
      return 0;
    }
  });
  
  return Math.max(...sequenceNumbers) + 1;
}

/**
 * Get the role from an ID
 * @param id The ID to extract the role from
 * @returns The role as a string ('student', 'teacher', 'admin', 'parent')
 */
export function getRoleFromId(id: string): string | null {
  if (isValidStudentId(id)) {
    return 'student';
  } else if (isValidTeacherId(id)) {
    return 'teacher';
  } else if (isValidAdminId(id)) {
    return 'admin';
  } else if (isValidParentId(id)) {
    return 'parent';
  }
  return null;
}
