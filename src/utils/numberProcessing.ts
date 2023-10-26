

export function parseCommaDecimalNumber(num: number): string {
  const partes = num.toFixed(2).split('.');
  const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimal = partes[1];

  return `${inteiro},${decimal}`;
  }

  export function parseCommaDecimalNumber2(num: number): string {
    const partes = num.toFixed(2).split('.');
    const inteiro = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `${inteiro}`;
    }
  

  export function simplifyNumber(numero: number): string {
    if (numero === 0) {
      return "0,00";
    } else if (numero < 1000) {
      return numero.toFixed(0);
    } else {
      const simplificado = (numero / 1000).toFixed(1);
      return simplificado + " K";
    }
  }