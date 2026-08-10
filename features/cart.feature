Feature: Shopping cart functionality

  Background:
    Given I am logged in with valid credentials

  Scenario: Add product and verify cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    Then the cart should contain "Sauce Labs Backpack"

  Scenario: Remove product from cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    When I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty