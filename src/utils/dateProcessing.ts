
const meses = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function getLastSevenDaysInterval(): [start: Date, end: Date] {
    const end = new Date();
    const start = new Date(end.getTime() - (6 * 24 * 60 * 60 * 1000));
  
    return [start, end];
  }

 export function getLastThirtyDaysInterval(): [start: Date, end: Date] {
    const end = new Date();
    const start = new Date(end.getTime() - (29 * 24 * 60 * 60 * 1000));
  
    return [start, end];
  }

  export function processDateRange(dateRange: string): string {
    const today = new Date();
    const rangeParts = dateRange.split('-').map(part => part.trim());
    const startDate = new Date(rangeParts[1]);
    const endDate = new Date(rangeParts[0]);
  

    if (isNaN(startDate.getTime())) {
      if (isSameDay(endDate,today))
        return "Hoje"
      else 
        return endDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
    }

    if (!startDate || (isSameDay(endDate, today) && isSameDay(startDate, today))) {

      return "Hoje";
    } else if (getDaysBetweenDates(endDate, today ) === 29) {
      return "Últimos 30 dias";
    } else if (getDaysBetweenDates(endDate, today ) === 6) {
      return "Últimos 7 dias";

    } else {
      const startStr = formatDate(startDate);
      const endStr = formatDate(endDate);
      return `${endStr} - ${startStr}`;
    }
  }

  export function isSameDay(date1: Date, date2: Date | null, verySpecificTIme: boolean = false): boolean {

    if (date2 === null || date2 === undefined || date1 === null || date1 === undefined)
      return false

    if (verySpecificTIme)
    return (
      date1.getTime() === date2.getTime()
    );
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
  


export function getDaysBetweenDates(date1: Date, date2: Date): number {

  const date1InMs = date1.getTime();
  const date2InMs = date2.getTime();

 
  const differenceInMs = date2InMs - date1InMs;


  const daysBetweenDates = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return daysBetweenDates;
}

export function formatDate(data: Date, inverterOrdem?: boolean): string {

  if (!data) {
    return ""
  }

  const dia = data.getDate();
  const mes = meses[data.getMonth()];

  if (inverterOrdem) {
    return `${mes} ${dia}`;
  }

  return `${dia} ${mes}`;
}


export function formatDate2(data: Date, mostrarHorario = true): string {
  const dia = data.getDate();
  const mes = data.getMonth() + 1; 
  const ano = data.getFullYear();
  const horas = data.getHours();
  const minutos = data.getMinutes();
  const segundos = data.getSeconds();

  const adicionarZero = (valor: number): string => {
    return valor < 10 ? `0${valor}` : `${valor}`;
  };

  const dataFormatada = `${adicionarZero(dia)}/${adicionarZero(mes)}/${ano}`;
  const horaFormatada = `${adicionarZero(horas)}:${adicionarZero(minutos)}`;

  if (mostrarHorario) {
    return `${dataFormatada} ${horaFormatada}`
  }

  return `${dataFormatada}`;
}

export const getStartOfDay = (date: Date): Date => {
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  return startOfDay;
};

export const getEndOfDay = (date: Date): Date => {
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  return endOfDay;
};

export function formatDateWithHours(date: Date): string {
  const dataAtual = new Date();
  
  if (isSameDay(date,dataAtual)) {
    return `Hoje, ${formatarHora(date)}`;
  } else {
    const dia = `${meses[date.getMonth()]} ${date.getDate()}`;
    return `${dia}, ${formatarHora(date)}`;
  }
}

function formatarHora(date: Date): string {
  let hora = date.getHours().toString();
  const minuto = date.getMinutes().toString().padStart(2, '0');

  if (hora === '0') {
    hora = '0';
  } else {
    hora = hora.padStart(2, '0');
  }

  return `${hora}:${minuto}`;
}

export function getSimpleDateHash(date: Date) {

  return date.getFullYear() + date.getMonth() + date.getDay()
}