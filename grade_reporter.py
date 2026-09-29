scores = [72, 45, 90, 61, 38]

passed = 0
failed = 0
total = 0

for score in scores:
    if score >= 80:
        grade = "A"
    elif score >= 70:
        grade = "B"
    elif score >= 50:
        grade = "C"
    else:
        grade = "F"

    print("Score:", score, "Grade:", grade)

    if score >= 50:
        passed += 1
    else:
        failed += 1

    total += score

average = total / len(scores)

print("Passed:", passed)
print("Failed:", failed)
print("Average:", round(average, 1))