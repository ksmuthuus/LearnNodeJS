
const fs = require('fs')
const fileName = 'notes.json'
const chalk = require('chalk')

const getNotes = function () {
    return 'My Notes....'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length == 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold('Note Added!'))
    }
    else {
        console.log(chalk.red.bold('Duplicate entry'))
    }

}

const removeNote = function (title) {

    const notes = loadNotes()
    const strippedNotes = notes.filter(function (note) {
        return note.title !== title
    })
    if (notes.length > strippedNotes.length) {
        saveNotes(strippedNotes)
        console.log(chalk.green.bold('Notes updated for removing ' + title))
    }
    else {
        console.log(chalk.red.bold('Title not found'))
    }
}

const listNotes = function () {
    const notes = loadNotes()
    notes.forEach(element => {
        console.log(chalk.yellow.inverse('Title: ' + element.title))
        console.log(chalk.blue.inverse('body: ' + element.body))
    });

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => {
        return note.title === title
    })
    debugger
    if (note) {
        console.log(chalk.blue.bold.inverse(note.title))
        console.log(note.body)
    }
    else {
        console.log(chalk.red.inverse('Title: ' + title + ' Not found'))
    }
}

const loadNotes = function () {
    try {
        const contentBuffer = fs.readFileSync(fileName)
        const contentString = contentBuffer.toString()
        return JSON.parse(contentString)
    }
    catch (e) {
        return []
    }
}

const saveNotes = function (notes) {
    fs.writeFileSync(fileName, JSON.stringify(notes))
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}