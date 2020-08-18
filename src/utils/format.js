
const skills = [
    "FrontEnd",
    "BakcEnd",
    "Web Design",
    "Data Science",
    "UI/UX",
    "Redes",
    "Cybersecurity",
    "Cloud",
    "AI/ML",
    "DevOps",
    "Full-Stack"
]

const nivel = [
    "Básico",
    "Intermediário",
    "Avançado"
]

//funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return skills[position]
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects: skills,
    weekdays: nivel,
    getSubject,
    convertHoursToMinutes
}