# sporangesheet
Script for Google Sheets to track which dates are within target.
It got this name because the conditional hilighting used in the
original sheet made cells that were outside the target range have
an orange background. (v1 was called the spREDsheet)

## Use

The included Code.gs file defines several functions that you can
use in Google Sheets documents. To add these to a sheet choose Tools >
Script Editor and paste the contents of Code.gs in.

## Functions

### TOTALNEWCOMERS

This takes 2 ranges. The first is a list of dates, and the second
is a corresponding status. If the status is equal to the required status,
and the date is before the supplied date, then this row is counted as 1.

Usage:

`TOTALNEWCOMERS($A3, FirstVisitRange, JethroStatusRange, "Core")`

Here cell A3 contains the date at the end of the month,
FirstVisitRange is a range of cells (1 x n) containing the
date someone visited, JethroStatusRange is a range of cells (1 x n)
containing the status of that person, and "Core" is the status we
need to count that person. Note that the 2 ranges must be the same
size, and must be 1 cell wide.

### PCTONTIME

This takes 2 ranges and a number of days "leniency", and tells you
the percentage of rows where the row in the second range was within
the specified number of days of the row in the first range. You supply
a date to indicate that you want to look at rows that were between
that date, and 30 days before. The date is normally the date at
the end of a month.

Usage:

`PCTONTIME($A3, FirstVisitRange, ContactDetailsRange, 7)`

Here we want to know the percentage of rows where the cell in the
ContactDetailsRange of cells (1 x n) was within 7 days of the
FirstVisitRange of cells (1 x n). We
are interested in rows where the cell in FirstVisitRange is no later
than the date in A3, and no earlier than 30 days before the date
in A3.

### PCTACCEPTED

This tells you the percentage of rows where there is a date in both
a cell for an invitation, and a date in a cell for an acceptance
of that invitation. You supply
a date to indicate that you want to look at rows that were between
that date, and 30 days before. The date is normally the date at
the end of a month.

Usage:

`PCTACCEPTED($A3, FirstVisitRange, InviteToMeetingRange, AttendMeetingRange)`

Where there is a date both in the InviteToMeetingRange (1 x n) and
the corresponding column in AttendMeetingRange (1 x n), this row is
considered accepted. We look at rows where the cell in FirstVisitRange
(1 x n) is no later than the date in A3, and no earlier than 30
days before the date in A3.