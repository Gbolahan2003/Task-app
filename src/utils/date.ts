export const convertDateToInputString = (date: Date) => {
    let year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${year}-${month}-${day}`
};

export const startOfWeek = (date: Date) => {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

export const next10Days = (offsetDate: Date) => {
    const result = [offsetDate];

    for (let i = 1; i <= 10; i++) {
        const nextDate = new Date(offsetDate);
        nextDate.setDate(offsetDate.getDate() + i);

        result.push(nextDate);
    }

    return result;
}

export const getMonthName = (month: number) => {
    switch (month) {
        case 0:
            return "January";

        case 1:
            return "February";

        case 2:
            return "March";

        case 3:
            return "April";

        case 4:
            return "May";

        case 5:
            return "June";

        case 6:
            return "July";

        case 7:
            return "August";

        case 8:
            return "September";

        case 9:
            return "October";

        case 10:
            return "November";

        case 11:
            return "December";
    }
};

export const isDateSame = (dateA: Date, dateB: Date): boolean => {
    return (
        dateA.getDate() === dateB.getDate() 
            && dateA.getMonth() === dateB.getMonth()
            && dateA.getFullYear() === dateB.getFullYear()
    )
}

const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return number + "th";
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
};

export const getDateString = (date: Date | string|undefined) => {
    if (typeof date === "string") {
        date = new Date(date);
    }

    let day: string | number =  Number(date && date.getDate());
    day = nthNumber(day);
    const monthName = date &&  getMonthName( date.getMonth());
    const year = date?.getFullYear();

    return `${day} ${monthName}, ${year}`;
}
export const formatDateForDatePicker = (dateString:Date| string|undefined): string => {

    if (!dateString) {
        return '';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Invalid date, handle as needed
        return '';
    }
    const year =  date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};