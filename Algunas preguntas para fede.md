- relation between CSDepartments and WDDepartments
- CSDepartments, is it usefull now?
- CSRegions is the only source of truth right?

- About [[ED-922#Dept Task 4 Update Account Request Form for the Department field to pull from the “Department Hierarchy” table title]]
	- confirmed that this field lives in accountRequest.person.cs_region
	- where do this field has to be shown? maybe where the removed "Supervisory Organization" was
	- in serializers/AccountRequestSerializer how can I return the region as an object
