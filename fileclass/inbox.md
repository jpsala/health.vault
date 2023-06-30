---
limit: 100
mapWithTag: true
icon: clipboard-list
tagNames: [inbox]
excludes: 
extends: 
version: 24
---
inbox.md
=========

inbox-status:: {"type":"Select","options":{"valuesList":{"3":"new"},"sourceType":"ValuesList","valuesListNotePath":"","valuesFromDVQuery":""}}


--- 
Tags:: {"type":"Multi","options":{"valuesList":{},"sourceType":"ValuesFromDVQuery","valuesListNotePath":"","valuesFromDVQuery":"dv.pages().file.tags.map(s => `#${s}`.slice(1)).distinct()"}}
