const tickets = dv.pages('and #active and -"templates"')
// console.clear()
// console.log('detalle2', tickets.values);
// tickets.values.forEach(t => {
  // console.log('ticket', t)
  // dv.el('div', JSON.stringify(t))
// })
dv.table(['Ticket ID', 'Description'], tickets.map(t => [t.file.link, t.description]))

