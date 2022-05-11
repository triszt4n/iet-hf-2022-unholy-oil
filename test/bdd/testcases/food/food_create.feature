Feature: Food creation
    Food can be created, created food shows up. Food ahs the correct data

    Scenario: Can create food
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Apple | 12 | 3 |
        Then The food by ID 1 has name "Apple"
        Then The food by ID 1 has kcal 12
        Then The food by ID 1 has lasts 3
