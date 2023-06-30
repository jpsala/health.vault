async function jsForTicketTemplate (tp, ticket) {
  const id = ticket.split(' ')[0].replace(/:/gi, ' ').trim()
  const description = ticket.substr(id.length).replace(/:/gi, ' ').trim()
    // .substr(id.length)
    // .replace(/\//gi, ' ')
    // .replace(/'/gi, ' ')
    // .replace(/?/gi, ' ')
    // .replace(/:/gi, ' ')
    // .replace(/&/gi, ' ')
    // .replace(/,/gi, ' ')
    // .replace(/./gi, ' ').trim()
  console.log(id);
  const url = `https://theirc.atlassian.net/browse/${id}`
return {id, description, url}
}
/*
ED-816:  In 'Change Worker Type' when a Employee is entered, In IT Systems tab Primary Business Unit Is in Red Require field mode even when the correct value is already entered by default
*/
module.exports = jsForTicketTemplate;  
