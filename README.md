# PLP Python Week 3 Assignment

## Files

- `grade_reporter.py` - Calculates grades, pass count, fail count, and average score.
- `bug_hunt.py` - Finds and fixes three bugs in a program that calculates the sum from 1 to 5.

The hardest bug to find was the loop condition because it did not produce an error message. I knew something was wrong because the program produced an incorrect answer instead of 15, so I checked the loop condition and found that `< 5` stopped the loop before adding 5.