const Database = require('./database/db.js')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format.js')

function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays})
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, devvys.*
        FROM devvys
        JOIN classes ON (classes.devvy_id = devvys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    console.log('pesquisa por professores realizada')

    try {
        const db = await Database
        const devvys = await db.all(query)

        devvys.map((devvy) => {
            devvy.subject = getSubject(devvy.subject)
        })

        return res.render('study.html', { devvys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
} 

function pageGiveClasses(req, res){
    

    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res){
    const createdevvy = require('./database/createdevvy.js')
    
    const devvyValue = {
        name: req.body.name,
        avatar: req.body.avatar, 
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject, 
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => 
    {
        return {
            weekday, 
            time_from: convertHoursToMinutes(req.body.time_from[index]), 
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
       
        const db = await Database
        await createdevvy(db, {devvyValue, classValue, classScheduleValues})
        

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}