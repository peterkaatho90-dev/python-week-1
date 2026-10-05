/* ==========================================================
   SQL Assignment - Aggregate Functions and GROUP BY
   Database : classicmodels (MySQL)
   Author   : Peter
   ========================================================== */

USE classicmodels;


/* ----------------------------------------------------------
   Question 1
   Total payment amount for each payment date (payments table).
   - Show payment date and total amount paid on that date
   - Sort by payment date, newest first
   - Keep only the 5 latest payment dates
   ---------------------------------------------------------- */
SELECT
    paymentDate,
    SUM(amount) AS total_amount
FROM payments
GROUP BY paymentDate
ORDER BY paymentDate DESC
LIMIT 5;


/* ----------------------------------------------------------
   Question 2
   Average credit limit of each customer (customers table).
   - Show customer name, country and the average credit limit
   - Group by customer name and country
   ---------------------------------------------------------- */
SELECT
    customerName,
    country,
    ROUND(AVG(creditLimit), 2) AS avg_credit_limit
FROM customers
GROUP BY customerName, country
ORDER BY customerName;


/* ----------------------------------------------------------
   Question 3
   Total price of products ordered (orderdetails table).
   - Show product code, quantity ordered and total price
   - Group by product code and quantity ordered
   - Total price = quantity ordered x price each
   ---------------------------------------------------------- */
SELECT
    productCode,
    quantityOrdered,
    SUM(quantityOrdered * priceEach) AS total_price
FROM orderdetails
GROUP BY productCode, quantityOrdered
ORDER BY productCode, quantityOrdered;


/* ----------------------------------------------------------
   Question 4
   Highest payment amount for each check number (payments table).
   - Show check number and the highest amount paid for it
   - Group by check number
   ---------------------------------------------------------- */
SELECT
    checkNumber,
    MAX(amount) AS highest_amount
FROM payments
GROUP BY checkNumber
ORDER BY checkNumber;
