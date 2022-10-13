Feature: Arcade coin

    Background: Coins are required (not free mode)
        Given my machine is configured to require coins

    Scenario: Successfully inserting coins
        Given I have not inserted any coins
        When I insert one US Quarter
        Then I should have a balance of 25 cents