Feature: Food update
    The data of foods can be updated, it is refleced in following queries.

    Scenario: Can update food
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Red Apple | 12 | 3 |
        Then There is a food by ID 1
        Then I change the name of food ID 1 to "Green Apple"
        Then The food by ID 1 has name "Green Apple"
        Then The food by ID 1 has kcal 12
        Then The food by ID 1 has lasts 3
