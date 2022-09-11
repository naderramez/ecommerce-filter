the application consists of a header, filters, and filters viewer
the header displays a logo.

the filters viewer displays the filters that has been selected and can remove a selected filter,
it takes all the options of a filter and filters them to display only the selected ones,
and it also takes an options setter to be able to mark an option as not selected and set the new options.

a filter is a btn the toggle a popup onClick which displays all the options,
and on clicking on an option it selects/deselects (highlight/remove highlight) the option temporarily (in a draft state),
on clicking on apply the selection goes from a draft state to a permenant state,
when closing and opening the popup again the selected options will appear as selected if selection is in permenant state,
otherwise selection will be gone upon closing the popup
Filter component takes these props or array of these props (depending on whether it's a regular filter or more filters btn):
id, label, options, applyFilters function, and clearFilters function.
