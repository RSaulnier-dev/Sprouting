import dateFnsParse from "date-fns/parse";
import {DateUtils} from "react-day-picker";
import dateFormat from "dateformat";

const FR_FORMAT = {
    formattedStringFromDate: 'dd/mm/yyyy',
    dateFromFormattedString : 'dd/MM/yyyy'
};
const US_FORMAT = {
    formattedStringFromDate: 'yyyy/mm/dd',
    dateFromFormattedString : 'yyyy/MM/dd'
};

function getDateFromFormattedString(str, format, locale) {
    const parsed = dateFnsParse(str, format.dateFromFormattedString, new Date(), {locale});
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function getFormattedStringFromDate(date, format) {
    return dateFormat(date, format.formattedStringFromDate);
}

function getNewDateByAddingNbrDays(date, nbrDays) {
    let ms = date.getTime() + nbrDays * 86400000;
    return new Date(ms);
}

function getNbrDaysBetween(date1, date2) {
    if (date2 > date1) {
        const oneDay = 1000 * 60 * 60 * 24;
        const differenceMs = date2 - date1;
        return Math.round(differenceMs / oneDay);
    } else {
        return 0;
    }
}

function getTodayDateWellFormatted(locale){
    return getDateFromFormattedString(getFormattedStringFromDate(new Date(), FR_FORMAT), FR_FORMAT, locale);
}

export {getTodayDateWellFormatted, getDateFromFormattedString, getFormattedStringFromDate, getNewDateByAddingNbrDays, getNbrDaysBetween, FR_FORMAT, US_FORMAT};