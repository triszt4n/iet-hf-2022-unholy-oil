
const moment = require('moment');
const config = require('../../config/globalConfig');


/**
 * Calculates how many days are between the actual date, and the given date in param,
 *  and assigns a warning class based on the date.
 * @param {Date to check} date 
 */
function getTextClassFromDate(date) {
    if(!date) return config.WarningClasses.none;

    const today = moment();
    const Expirationday = moment(date);
    let diff = Expirationday.diff(today,'days');


    if(diff < 0 ) return config.WarningClasses.danger;
    else if (diff >= 0 && diff <= 180) return config.WarningClasses.warning;
    else return config.WarningClasses.good;

}

module.exports = getTextClassFromDate;