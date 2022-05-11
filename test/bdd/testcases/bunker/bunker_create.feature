Feature: Bunker creation
    Do bunkers get created properly? Do created bunkers have the data that was provided?

    Scenario: Creating a single bunker
        Given There are no bunkers
        When I create the following bunkers:
        | _id | name | adress | capacity |
        | 1 | TestBunker | Budapest | 100 |
        Then The bunker with ID 1 has name "TestBunker"
        Then The bunker with ID 1 has adress "Budapest"
        Then The bunker with ID 1 has capacity 100

    Scenario: Creating multiple bunkers
        Given There are no bunkers
        When I create the following bunkers:
        | _id | name | adress | capacity |
        | 1 | TestBunker | Budapest | 100 |
        | 2 | TestBunkerOther | New York | 200 |
        | 3 | ThirdBunker | Paris | 25 |
        Then There are 3 bunkers
        Then The bunker with ID 1 has name "TestBunker"
        Then The bunker with ID 2 has adress "New York"
        Then The bunker with ID 3 has capacity 25
