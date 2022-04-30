/**
 * Contans some of the constants, and settings of the whole webapp
 */

const config = {

    useAuthentication: true, //for debug purpose, if set to false authentication wont be used 

    avarageCalorieIntake: 2000, // Avarage calorie intake of a human adult, given in kcal

    WarningClasses: {
        none: {

            message: 'Nincs étel a raktárban',
            class: 'text-secondary'

        },

        good: {
            message: '-',
            class: 'text-secondary'
        },

        warning: {
            message: 'Fél éven belűl romlandó étel',
            class: 'text-warning'
        },

        danger: {
            message: 'Romlott étel ',
            class: 'text-danger'
        }

    }

}



module.exports = config;