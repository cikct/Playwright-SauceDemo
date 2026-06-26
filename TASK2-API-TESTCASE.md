# Task 2.1 — API Test Case Design
**Endpoint under test:**
```
POST /api/cart/add
Body: { "product_id": integer, "quantity": integer }
Auth: Bearer token required

# Assumptions
Since the endpoint specs does not define the complete business rules, the expected HTTP status codes below are based on common REST API conventions.
The following assumptions have been made:
•	product_id must reference an existing product.
•	quantity must be a positive integer (> 0)
•	No maximum quantity or stock limit is specified; therefore, only values less than or equal to 0 are treated as invalid.
•	A successful add to cart operation returns HTTP 200 OK.
•	If the same product is added more than once, the cart quantity is updated rather than creating a duplicate line item


# Test Cases : 

| # | Scenario| Input |	HTTP status code |
|---|---------|-------|------------------|
| 1 | Add Valid Product | Valid token,valid product_id = 1234, quantity=1, | 200 OK |
| 2 | Missing auth token |	Valid body , no token |	401 Unauthorized |
| 3 | Invalid auth token |	Valid body, invalid token | 401 Unauthorized |
| 4 | Nonexistent product |	product_id=999999, quantity=1 |	404 Not Found |
| 5 | Missing required field | quantity=1 |	400 Bad Request |
| 6 | Invalid type for product_id |	product_id=abc, quantity=1 | 400 Bad Request |
| 7 | (Boundary Checking) Quantity = 0 | valid product_id, quantity=0 | 400 Bad Request |
| 8| (Boundary Checking) Quantity = -1 | valid product_id, quantity=-1 |	400 Bad Request |
| 9| Duplicate product added | same product already in cart:product_id = 1234, quantity=1 | 200 OK |

