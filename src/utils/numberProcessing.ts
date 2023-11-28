

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

  export function formatNumber(valor: number, formatar: boolean =  true): string {
		if (valor < 1000) {
			return valor.toString();
		} else {
			const magnitude = Math.pow(10, Math.floor(Math.log10(valor)));
			
			if (valor < 1_000_000) {
				const multiplicador = Math.ceil(valor / magnitude);
				const valorFormatado = multiplicador * magnitude;
				
				if (!formatar) {
					return valorFormatado.toString();
				}
				
				if (valorFormatado >= 1000) {
					return (valorFormatado / 1000).toString() + "k";
				} else {
					return valorFormatado.toString();
				}
			} else {
				const multiplicador = Math.ceil(valor / 1_000_000);
				const valorFormatado = multiplicador * 1_000_000;
				
				if (!formatar) {
					return valorFormatado.toString();
				}
				
				if (valorFormatado >= 1_000_000) {
					return (valorFormatado / 1_000_000).toString() + "M";
				} else {
					return valorFormatado.toString();
				}
			}
		}
  }