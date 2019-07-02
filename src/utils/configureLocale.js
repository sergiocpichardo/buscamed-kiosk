import {LocaleConfig, Calendar, Agenda} from 'react-native-calendars';

export const configureLocale = (lng) => {

    LocaleConfig.locales['es'] = {
        monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
        dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        dayNamesShort: ["dom.", "lun.", "mar.", "mié.", "jue.", "vie.", "sáb."]
    };

    LocaleConfig.defaultLocale = 'es';

};