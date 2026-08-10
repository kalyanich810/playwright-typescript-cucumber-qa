Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given I am on the SauceDemo login page
    When I enter valid login credentials
    And I click the login button
    Then I should be successfully logged in