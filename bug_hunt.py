# Bug Hunt - three bugs found and fixed
# NOTE: replace these examples with the bugs from YOUR assignment.

scores = [72, 45, 88, 60, 39]

# BUG 1: The original used "=" (assignment) instead of "==" (comparison)
# in the if statement, which causes a SyntaxError. Fixed by using "==".
target = 88
if scores[2] == target:
    print("Found the top score:", target)

# BUG 2: The original looped with range(1, len(scores)), which starts at
# index 1 and silently skips the first score (off-by-one error).
# Fixed by looping over the list directly so every score is checked.
passed = 0
for score in scores:
    if score >= 50:
        passed = passed + 1
print("Students who passed:", passed)

# BUG 3: The original while loop never changed "count", so the condition
# stayed True forever (infinite loop). Fixed by adding count = count + 1.
count = 1
while count <= 3:
    print("Attempt", count)
    count = count + 1
