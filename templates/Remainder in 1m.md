<%*
const datePlusOneMin = window.moment().add(1, 'm').format('YYYY-MM-DD H:mm')
const remainder = `- [ ] texto (@${datePlusOneMin}:00)`
-%><% remainder %>
