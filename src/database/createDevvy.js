module.exports = async function(db, {devvyValue, classValue, classScheduleValues}){
    
    const inserteddevvy = await db.run(`
        INSERT INTO devvys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${devvyValue.name}",
            "${devvyValue.avatar}",
            "${devvyValue.whatsapp}",
            "${devvyValue.bio}"
        );
    `)

    const devvy_id = inserteddevvy.lastID

    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                devvy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${devvy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)
}