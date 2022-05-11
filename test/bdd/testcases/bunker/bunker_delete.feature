Feature: Bunker deletion
    If a bunker is to be deleted, it is removed from the system when the delete is called.

    Scenario: Bunker by ID exists, delete should happen
        Given There are no bunkers
        Given Bunker by ID 1 exists
        When I delete bunker by ID 1
        Then There are 0 bunkers
        Then There is no bunker with ID 1

    Scenario: Multiple bunkers exist, only one gets deleted
        Given There are no bunkers
        Given 10 bunkers exist
        When I delete bunker by ID 3
        Then There are 9 bunkers
        Then There is no bunker with ID 3
