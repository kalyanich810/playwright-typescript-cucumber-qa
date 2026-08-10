Feature: Login functionality

  Scenario: Successful login with valid credentials
    Given I am on the SauceDemo login page
    When I enter valid login credentials
    And I click the login button
    Then I should be successfully logged in

  Scenario: Login with invalid username
    Given I am on the SauceDemo login page
    When I enter username "invalid_user" and password "secret_sauce"
    And I click the login button
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with invalid password
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password "wrong_password"
    And I click the login button
    Then I should see the login error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Login with empty username
    Given I am on the SauceDemo login page
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then I should see the login error message "Epic sadface: Username is required"

  Scenario: Login with empty password
    Given I am on the SauceDemo login page
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should see the login error message "Epic sadface: Password is required"