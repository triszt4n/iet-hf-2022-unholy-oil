Feature: Food deletion
    Food can be deleted, deleted food does not exist anymore.

    Scenario: Can delete food
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Apple | 12 | 3 |
        Then I delete food by ID 1
        Then There are 0 foods
        Then There is no food by ID 1

    Scenario: Can delete one food out of many
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Apple | 12 | 3 |
        | 2 | Pizza | 650 | 8 |
        | 3 | 274 carrots | 2680 | 274 |
        Then I delete food by ID 2
        Then There are 2 foods
        Then There is no food by ID 2
        Then There is a food by ID 1
        Then There is a food by ID 3
