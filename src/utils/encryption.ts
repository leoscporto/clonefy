

export const hashCode = (input: string): number => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + charCode;
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };
  