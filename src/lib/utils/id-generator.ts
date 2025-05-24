/**
 * Utility functions for generating unique IDs for students and teachers
 */

/**
 * Generates a unique 10-digit ID for a student or teacher
 * @param prefix The prefix to use for the ID (e.g., 'STU' for students, 'TCH' for teachers)
 * @param existingIds Array of existing IDs to check against for uniqueness
 * @returns A unique 10-digit ID
 */
export function generateUniqueId(prefix: string, existingIds: string[] = []): string {
  const generateRandomDigits = (): string => {
    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
    return randomNum.toString();
  };

  const isIdUnique = (id: string): boolean => {
    return !existingIds.includes(id);
  };

  let newId: string;
  do {
    newId = generateRandomDigits();
  } while (!isIdUnique(newId));

  return newId;
}

/**
 * Generates a unique student ID
 * @param existingIds Array of existing student IDs to check against for uniqueness
 * @returns A unique student ID
 */
export function generateStudentId(existingIds: string[] = []): string {
  return generateUniqueId('STU', existingIds);
}

/**
 * Generates a unique teacher ID
 * @param existingIds Array of existing teacher IDs to check against for uniqueness
 * @returns A unique teacher ID
 */
export function generateTeacherId(existingIds: string[] = []): string {
  return generateUniqueId('TCH', existingIds);
}

/**
 * Generates a unique parent ID
 * @param existingIds Array of existing parent IDs to check against for uniqueness
 * @returns A unique parent ID
 */
export function generateParentId(existingIds: string[] = []): string {
  return generateUniqueId('PAR', existingIds);
}

/**
 * Generates a unique admin ID
 * @param existingIds Array of existing admin IDs to check against for uniqueness
 * @returns A unique admin ID
 */
export function generateAdminId(existingIds: string[] = []): string {
  return generateUniqueId('ADM', existingIds);
}
