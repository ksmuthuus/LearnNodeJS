const chalk = require('chalk')
const notes = require('./notes')
const yargs = require('yargs')
yargs.version('1.0.1')

//Adding a Note
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Title for the Note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Removing a Note
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

//List the Note
yargs.command({
    command: 'list',
    describe: 'Lists the Notes',
    handler() {
        notes.listNotes()
    }
})

//Read the notes
yargs.command({
    command: 'read',
    describe: 'Read a Note',
    buiilder: {
        title: {
            describe: 'Node Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()