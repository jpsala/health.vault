const notes = dv.pages('#inbox').sort(page => page.file.mtime, "desc")
const {update} = this.app.plugins.plugins["metaedit"].api
const {fieldModifier: f} = this.app.plugins.plugins["metadata-menu"].api;

dv.table(['Description', 'mdate', 'Tags'], 
notes
.map(t => {
  const date = t.file.mtime.toFormat('yy/MM/dd')
    // const status = t.status ? ` (<b>${t.status}</b>)` : ''
    const desc = dv.fileLink(t.file.path,false,`${t.file.name}`)
    const tags = f(dv, t, "Tags")
    return [
      dv.el('div',desc, {cls:'small'}),
      dv.el('div',date, {cls:'xsmall'}),
      dv.el('div',tags, {cls:'xsmall'}),
    ]
  })
)
