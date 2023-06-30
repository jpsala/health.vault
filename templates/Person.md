<%*
  let name = tp.file.title
  if (name.startsWith("Untitled")) {
    name = await tp.system.prompt("Name");
    await tp.file.move("People/" + name);
  }
%># <% name %>
## Image
<% tp.file.cursor() %>




---
Tags:: <% `#` %>people/<% name.replace(/ /g, '') %>


