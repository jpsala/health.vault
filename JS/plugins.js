const plugins = app.plugins.plugins
const filter = dv.current().filter

const filteredPlugins = filter ?
    Object.keys(plugins).filter(p => p.includes(filter))
  :
    Object.keys(plugins)
// window.open('obsidian://show-plugin?id=cmdr')
filteredPlugins.forEach( p => {
  dv.el('div', 
  `[${p}](obsidian://show-plugin?id=${p})`
  )
})

