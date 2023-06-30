module.exports = {}
module.exports.onload = function(plugin) {
    console.log('fooBar loaded');
    plugin.addCommand({
        name: 'FooBar',
        callback: () => {     
          run(plugin)     
        }
    });
}
module.exports.onunload = function(plugin) {
    console.log('unload')
}

async function run(plugin){
  const folders = plugin.app.vault.getAllLoadedFiles().filter(i => i.children).map(folder => folder.path);
  const folder = await plugin.helpers.suggest(folders, folders);
  console.log('app', folder);
}
