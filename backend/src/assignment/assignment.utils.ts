/**
 * Utility functions for assignment calculations
 */

/**
 * Calculates remaining days of treatment based on start date and total days
 * @param startDate - The start date of the treatment
 * @param numberOfDays - Total number of days for the treatment
 * @param referenceDate - Optional reference date (defaults to current date)
 * @returns Number of remaining days (minimum 0)
 */
export function getRemainingDays(
  startDate: Date, 
  numberOfDays: number, 
  referenceDate: Date = new Date()
): number {
  // If treatment hasn't started yet, return 0
  if (referenceDate < startDate) {
    return 0;
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + numberOfDays);
  
  // If we're past or exactly on the end date, return 0
  if (referenceDate >= endDate) {
    return 0;
  }
  
  // Calculate remaining days
  const remainingTime = endDate.getTime() - referenceDate.getTime();
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, remainingDays);
} 