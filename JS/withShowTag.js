const notes = dv.pages('#show').sort(page => page.file.mtime, "desc")
// const {update} = this.app.plugins.plugins["metaedit"].api
// const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
// // console.log('dv.pages().file.tags.map(s => ', dv.pages().file.tags.map(s => `#${s}`.slice(1)).distinct())
// dv.list(notes.file.link)


if(!notes?.length)
  dv.paragraph('No TODO\'s')

notes.forEach(t => dv.el('div', `- ${t.file.link}`))
