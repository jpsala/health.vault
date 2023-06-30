const tasks = dv.page('/TODO')?.file.tasks.values?.filter(t=>t.status === ' ')

if(!tasks?.length)
  dv.paragraph('No TODO\'s')

tasks.forEach(t => dv.el('div', `- ${t.text}`))
