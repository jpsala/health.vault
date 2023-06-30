const notes = dv.pages('#inbox').sort(page => page.file.mtime, "desc")
// const {update} = this.app.plugins.plugins["metaedit"].api
// const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
// // console.log('dv.pages().file.tags.map(s => ', dv.pages().file.tags.map(s => `#${s}`.slice(1)).distinct())
// dv.list(notes.file.link)


if(!notes?.length)
  dv.paragraph('There are no notes in INBOX')

notes.forEach(t => dv.el('div', `- ${t.file.link}`))
