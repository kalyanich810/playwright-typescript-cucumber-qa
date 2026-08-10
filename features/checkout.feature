Feature: Checkout functionality

  Background:
    Given I am logged in with valid credentials

  Scenario: Complete checkout for a product
    When I add "Sauce Labs Backpack" to the cart
    And I open the shopping cart
    And I proceed to checkout
    And I enter checkout details "Kalyani", "Tester", "500001"
    And I continue to order overview
    And I finish the order
    Then I should see the order confirmation message