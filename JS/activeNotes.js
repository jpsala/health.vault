const notes = dv.pages('#active and -"templates" and -#type/ticket').sort(page => page.file.mtime, "desc")
const {update} = this.app.plugins.plugins["metaedit"].api
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;
// console.log('dv.pages().file.tags.map(s => ', dv.pages().file.tags.map(s => `#${s}`.slice(1)).distinct())
dv.table(['Type', 'Description', 'mdate', 'Tags', 'Status'], 
  notes
  .filter(t => {
    return t.file.link.path === 'TODO.md' ? false : t
  })
  .map(t => {
    const date = t.file.mtime.toFormat('yyyy/MM/dd')
    if(t.file.folder === 'Tickets') {
      const status = t.status ? ` (<b>${t.status}</b>)` : ''
      const desc = dv.fileLink(t.file.path,false,`${t.id}: ${t.description?.substring(0, 100)} ` + `${status}`)
      const tags = f(dv, t, "Tags")
      return [
        'Ticket',
        dv.el('div',desc, {cls:'small'}),
        dv.el('div',date, {cls:'xsmall'}),
        dv.el('div',tags, {cls:'xsmall'}),
        dv.el('div',t["ticket-status"], {cls:'xsmall'}),
      ]
    }
    else if (t.file.folder === 'Notes') {
      const tags = f(dv, t, "Tags")
      return ['Note',dv.el('div', t.file.link, {cls:'small'}), dv.el('div',date, {cls:'xsmall'}), dv.el('div',tags, {cls:'small'})]
    }
    else if (t.file.link.path === 'TODO.md'){
      return ['TODO', dv.el('div', t.file.link, {cls:'small'}), dv.el('div',date, {cls:'xsmall'})]
    }
    else if (t.file.folder === 'Daily') {
      const tags = f(dv, t, "Tags")
      return ['Daily', dv.el('div', t.file.link, {cls:'small'}), dv.el('div',date, {cls:'xsmall'}), dv.el('div',tags, {cls:'small'})]
    } else 
      return [t.file.folder, dv.el('div', t.file.link, {cls:'small'}), date]
  })
)

/*

// console.clear()
// console.log('detalle2', tickets.values);
// tickets.values.forEach(t => {
  // console.log('ticket', t)
  // dv.el('div', JSON.stringify(t))
// })
const {update} = this.app.plugins.plugins["metaedit"].api
const {createButton} = app.plugins.plugins["buttons"]
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;

dv.table(['Type', 'Description', 'm-date', 'Tags', 'Other'], 
  await Promise.all(dv.pages('#active and -"templates"').map( async t => {
    const date = t.file.mtime.toFormat('yyyy/MM/dd')
    if(t.file.folder === 'Tickets') {
      const status = t.status ? ` (<b>${t.status}</b>)` : ''
      return [
        'Ticket',
        await dv.fileLink(t.file.path,false,`${t.id}: ${t.description} `) + `${status}`,
        await date,
        await f(dv, t, "Tags"),
        await f(dv, t, "ticket-status")
        // createButton(
        //   {
        //     app, el: this.container, args: {name: "Done!"}, clickOverride: {click: update, params: ['Status', 'Completed', t.file.path]}
        //   }
        //)
      ]
    }
    else if (t.file.folder === 'Notes') 
      return ['Note', t.file.link, date]
    else if (t.file.folder === 'Daily') 
      return ['Daily', t.file.link, date]
      else (t.file.folder === 'Daily') 
      return ['', t.file.link, date]
  }).sort((p,n)=>{
    return p.file.ctime
    return p.file.mtime< n.file.mtime
  }))
)


*/
