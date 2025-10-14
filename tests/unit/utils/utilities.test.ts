// Exemplo de testes para funções utilitárias
// Este arquivo mostra como testar funções helpers/utilities

describe('Utility Functions', () => {
  describe('String Utilities', () => {
    it('should validate email format', () => {
      // Exemplo de função que você pode implementar
      const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });

    it('should sanitize user input', () => {
      // Exemplo de função de sanitização
      const sanitizeString = (input: string): string => {
        return input.trim().toLowerCase();
      };

      expect(sanitizeString('  TEST  ')).toBe('test');
      expect(sanitizeString('MiXeD CaSe')).toBe('mixed case');
      expect(sanitizeString('')).toBe('');
    });
  });

  describe('Date Utilities', () => {
    it('should format date correctly', () => {
      // Exemplo de função de formatação de data
      const formatDate = (date: Date): string => {
        const isoString = date.toISOString();
        const datePart = isoString.split('T')[0];
        return datePart || '';
      };

      const testDate = new Date('2023-12-25T10:30:00Z');
      expect(formatDate(testDate)).toBe('2023-12-25');
    });

    it('should check if date is in the past', () => {
      // Exemplo de função de validação de data
      const isDateInPast = (date: Date): boolean => {
        return date < new Date();
      };

      const pastDate = new Date('2020-01-01');
      const futureDate = new Date('2030-01-01');
      
      expect(isDateInPast(pastDate)).toBe(true);
      expect(isDateInPast(futureDate)).toBe(false);
    });
  });

  describe('Array Utilities', () => {
    it('should remove duplicates from array', () => {
      // Exemplo de função para remover duplicatas
      const removeDuplicates = <T>(array: T[]): T[] => {
        return Array.from(new Set(array));
      };

      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
      expect(removeDuplicates([])).toEqual([]);
    });

    it('should chunk array into smaller arrays', () => {
      // Exemplo de função para dividir array em chunks
      const chunkArray = <T>(array: T[], size: number): T[][] => {
        if (size <= 0) return [];
        const chunks: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
          chunks.push(array.slice(i, i + size));
        }
        return chunks;
      };

      expect(chunkArray([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunkArray(['a', 'b', 'c'], 1)).toEqual([['a'], ['b'], ['c']]);
      expect(chunkArray([], 3)).toEqual([]);
    });
  });
});