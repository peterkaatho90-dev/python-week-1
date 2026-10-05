# PLP Python Week 7 - Lists

- `list_warmup.py` - creates a fruit list and demonstrates index access, `.append()`, `.remove()` and `len()`.
- `shopping_list.py` - an interactive shopping list menu (add / remove / show / done) that never crashes.
- `list_report.py` - prints a numbered list, counts names longer than 4 letters, and finds the longest name with a loop.
- `screenshots/` - screenshots of each program running.

## Why check `in` before `.remove()`?

Calling `.remove()` on an item that is not in the list raises a `ValueError` and crashes the program. Checking with `in` first lets the program print a friendly message and keep running instead. It makes the code safer because bad user input can never stop the whole session.
