const Database = require('./db.js')
const createdevvy = require('./createdevvy.js')

Database.then(async (db) => {

    devvyValue = {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: 999343465, 
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        
    }

    classValue = {
        subject: 1, 
        cost: "20", 
    }

    classScheduleValues = [
        {
            weekday: 0, 
            time_from: 720, 
            time_to: 1220 
        },

        {
            weekday: 1, 
            time_from: 432, 
            time_to: 1265 
        }
    ]

    //await createdevvy(db, {devvyValue, classValue, classScheduleValues})

    const selecteddevvys = await db.all("SELECT * FROM devvys")

    const selectClassesAnddevvys = await db.all(`
        SELECT classes.*, devvys.*
        FROM devvys
        JOIN classes ON (classes.devvy_id = devvys.id)
        WHERE classes.devvy_id = 1;
    `)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1000"
        AND class_schedule.time_to > "700"
    `)

    console.log(selectClassesSchedules)
})