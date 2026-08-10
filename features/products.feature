Feature: Products functionality

  Background:
    Given I am logged in with valid credentials

  Scenario: Verify products are displayed
    Then I should see products on the products page

  Scenario: Sort products by price low to high
    When I sort products by "Price (low to high)"
    Then the products should be sorted by price from low to high

  Scenario: Add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    Then the cart should contain "Sauce Labs Backpack"