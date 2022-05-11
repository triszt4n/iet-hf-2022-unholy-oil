Feature: Adding storageitems to bunker
    Adding items to bunkers correctly creates the storage items and updates the bunker.

    Scenario: Creating a singular storageitem for a singular bunker
        Given There are no bunkers
        Given There are no storage items
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Big Apple | 20000 | 3 |
        When I create the following bunkers:
        | _id | name | adress | capacity |
        | 1 | TestBunker | Budapest | 1 |
        Then I create the following storage items:
        | _id | type | quantity | dop | bunkerId |
        | 1 | 1 | 1 | 2022-10-10T00:00:00+02:00 | 1 |
        Then The bunker with ID 1 has stock_dur 10
        Then The bunker with ID 1 has nextExpDate "2022-10-13T00:00:00+02:00"

    Scenario: Multiple bunkers, multiple foods and multiple storage items
        Given There are no bunkers
        Given There are no storage items
        Given There are no foods
        When I create the following foods:
        | _id | name | kcal | lasts |
        | 1 | Big Apple | 20000 | 1 |
        | 2 | Small Apple | 2000 | 1 |
        | 3 | Food packet | 1000 | 10 |
        When I create the following bunkers:
        | _id | name | adress | capacity |
        | 1 | BunkerOne | Budapest | 1 |
        | 2 | BunkerTwo | New York | 2 |
        | 3 | BunkerThree | London | 3 |
        Then I create the following storage items:
        | _id | type | quantity | dop                       | bunkerId |
        | 1   | 1    | 4        | 2022-10-10T00:00:00+02:00 | 1        |
        | 6   | 3    | 3        | 2022-10-10T00:00:00+02:00 | 1        |
        | 2   | 3    | 6        | 2022-10-10T00:00:00+02:00 | 2        |
        | 4   | 3    | 1        | 2022-10-10T00:00:00+02:00 | 2        |
        | 3   | 2    | 10       | 2022-10-10T00:00:00+02:00 | 3        |
        | 5   | 1    | 7        | 2022-10-10T00:00:00+02:00 | 3        |
        | 7   | 2    | 87       | 2022-10-10T00:00:00+02:00 | 3        |
        Then The bunker with ID 1 has stock_dur 42
        Then The bunker with ID 2 has stock_dur 2
        Then The bunker with ID 3 has stock_dur 56
        Then The bunker with ID 1 has nextExpDate "2022-10-11T00:00:00+02:00"
        Then The bunker with ID 2 has nextExpDate "2022-10-20T00:00:00+02:00"
        Then The bunker with ID 3 has nextExpDate "2022-10-11T00:00:00+02:00"
