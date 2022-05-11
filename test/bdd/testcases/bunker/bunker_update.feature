Feature: Bunker update
    Does updating fields of the bunkers work? Do the new field values get displayed?

    Scenario: Modifying the only bunker in the system
        Given There are no bunkers
        When I create the following bunkers:
        | _id | name | adress | capacity |
        | 1 | TestBunker | Budapest | 100 |
        Then I change the name of bunker ID 1 to "ChangedName"
        Then The bunker with ID 1 has name "ChangedName"
