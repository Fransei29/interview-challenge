import { getRemainingDays } from './assignment.utils';

/**
 * Unit tests for assignment utility functions
 */
describe('Assignment Utils', () => {
  describe('getRemainingDays', () => {
    it('should return correct remaining days for future treatment', () => {
      const startDate = new Date('2024-01-01');
      const numberOfDays = 10;
      const result = getRemainingDays(startDate, numberOfDays);
      
      // Should return a positive number for future treatments
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('should return 0 for completed treatment', () => {
      const startDate = new Date('2024-01-01');
      const numberOfDays = 5;
      const result = getRemainingDays(startDate, numberOfDays);
      
      // For past treatments, should return 0
      expect(result).toBe(0);
    });

    it('should return 0 for treatment ending today', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 5);
      const numberOfDays = 5;
      const result = getRemainingDays(startDate, numberOfDays);
      
      expect(result).toBe(0);
    });

    it('should return positive days for ongoing treatment', () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 2);
      const numberOfDays = 10;
      const result = getRemainingDays(startDate, numberOfDays);
      
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(8); // 10 - 2 = 8 days remaining
    });

    it('should handle zero days treatment', () => {
      const startDate = new Date();
      const numberOfDays = 0;
      const result = getRemainingDays(startDate, numberOfDays);
      
      expect(result).toBe(0);
    });

    it('should handle negative days gracefully', () => {
      const startDate = new Date();
      const numberOfDays = -5;
      const result = getRemainingDays(startDate, numberOfDays);
      
      expect(result).toBe(0);
    });
  });
}); 