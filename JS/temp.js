const dv = app.plugins.plugins.dataview.api

const pages = dv.pages('#type/ticket').where( r => r.hasOwnProperty('active') && r.active === true
const pages = dv.pages('#type/ticket').where( r => r.hasOwnProperty('active') && r.active === true
)
dv.span('hola')
pages.forEach( r => {
  console.log(r)
  if(r.hasOwnProperty('active')){
      dv.el('div', r.file.name + ' -> yes')
    } else {
      dv.el('div', r.file.name + ' -> no')
    }
  // dv.span(`### ${p}`) 
  // dv.table(['Name', 'Active'], d.map(r => [r.file.link, r.active?'Y':'']))
  // const mt = dv.markdownTable(['Name', 'Active'], d.map(r => [r.file.link, r.active?'Y':'']))
  // dv.paragraph(mt)
})
