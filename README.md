# Ticketing System

Welcome to the Ticketing System!

This application tracks pending tickets and their priorities.

## Browser Versions

For use with Google Chrome Version >= 85.0.4183.83 (Official Build) (64-bit),
or Safari Version >= 13.1.2.

## Conceptual Background

The rows of the table can be sorted either by ticket number, or by priority.
Furthermore, the rows can be sorted in either ascending, or descending order.

If the rows of the table are already sorted on a given column in ascending order, 
then sorting the rows on that column again sorts the rows on that column in descending order.

Conversely, if the rows of the table are already sorted on a given column in descending order, 
then sorting the rows on that column again sorts the rows on that column in ascending order.

By defualt, the rows of the table are sorted in ascending order on the column named `Ticket Number`.

## Getting Started

Clicking on the column header named `Priority` sorts the rows by priority.
Clicking on the column header named `Ticket Number` sorts the rows by ticket number.

Clicking the same column header twice in a row is an idempotent operation.

An indicator `^` is appended to a column name if that column is sorted in ascending
order. An indicator `v` is appended to a column name if that column is sorted in
descending order.

Additional data can be loaded into the table by clicking the button labeled `Load More`.

If the data is already sorted by a given column, it will continue to be sorted by that
column after clicking the button labeled `Load More`.

If the button labeled `Load More` is clicked more than once, a message will appear,
indicating that no more data is available to be loaded.

## Extensibility

Although this application currently uses hard-coded data,
it can be easily extended to process a dynamic JSON response from an API.

## Author

Hillel Wolin

## License

This project is licensed under the MIT License.

## Acknowledgments

Two functions from the w3 schools library are adapted for use in this project.
See https://www.w3schools.com/lib/w3.js for more details.
