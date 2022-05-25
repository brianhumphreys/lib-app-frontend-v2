// https://docs.cypress.io/api/introduction/api.html

describe("User", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });
  it.skip("sign in and login ", () => {
    // login email required
    cy.get("[id=email-input-field]").focus();
    cy.get("[id=test-login-button]").click();
    cy.get("[name=email]").should("be.visible");

    // login password required
    cy.get("[id=password-input-field]").focus();
    cy.get("[id=test-login-button]").click();
    cy.get("[name=password]").should("be.visible");

    // incorrect details. user doesn't exist
    cy.get("[id=email-input-field]").type("ryatt@gmail.com");
    cy.get("[id=password-input-field]").type("bad password{enter}");
    cy.get("[id=login-error-message]").should("be.visible");

    // navigate to signup
    cy.get("[id=signup-link]").click();

    // email, password, signup required
    cy.get("[id=test-signup-button]").click();
    cy.get("[id=email-error-message]").should("be.visible");
    cy.get("[id=password-error-message]").should("be.visible");
    cy.get("[id=role-error-message]").should("be.visible");

    cy.get("[id=email-input-field]").type("ryatt@gmail.com");
    cy.get("[id=password-input-field]").type("password");
    cy.get("[id=role-input-field]").select("user");
    cy.get("[id=test-signup-button]").click();

    // navigate to signup
    cy.get("[id=login-link]").click();

    // login with newly made creds
    cy.get("[id=email-input-field]").type("ryatt@gmail.com");
    cy.get("[id=password-input-field]").type("password");
    cy.get("[id=test-login-button]").click();

    // should not see admin tab
    cy.get("[id=admin-link]", { timeout: 0 }).should("not.exist");

    cy.get("[id=profile-header]").should("be.visible");
  });

  it.skip("redirect from profile to sign in if no user is present", () => {
    cy.visit("http://localhost:3000/profile");

    // redirects to login
    cy.get("[id=email-field]").should("be.visible");
  });

  it("user can checkout and check in a book", () => {
    // navigate to signup
    cy.get("[id=signup-link]").click();

    // create admin account
    cy.get("[id=email-input-field]").type("bigryatt@gmail.com");
    cy.get("[id=password-input-field]").type("password");
    cy.get("[id=role-input-field]").select("admin");
    cy.get("[id=test-signup-button]").click();

    cy.visit("http://localhost:3000/login");

    // login to admin
    cy.get("[id=email-input-field]").type("bigryatt@gmail.com");
    cy.get("[id=password-input-field]").type("password");
    cy.get("[id=test-login-button]").click();

    // navigate to signup
    cy.get("[id=login-link]").click();

    // // login with newly made creds
    // cy.get("[id=email-input-field]").type("bigryatt@gmail.com");
    // cy.get("[id=password-input-field]").type("password");
    // cy.get("[id=test-login-button]").click();

    cy.get("[id=admin-link]").click();

    
    cy.get("[id=admin-book-row]").should('have.length', 6);

    // add a new book
    cy.get("[id=title-input-field]").type("A New Book");
    cy.get("[id=author-input-field]").type("A New Author");
    cy.get("[id=isbn-input-field]").type("A New ISBN");
    cy.get("[id=description-field]").type("A New Description");

    cy.get("[id=test-add-book-button]").click();

    cy.get("[id=admin-book-row]").should('have.length', 7);
    
    cy.get("[id=test-admin-book-title]").first().contains("A New Book");
    
    // navigate to the admin book page
    cy.get("[id=admin-book-row]").first().click();

    // before updatin, lets clear the default text
    cy.get("[id=title-update-field]").clear();
    cy.get("[id=author-update-field]").clear();
    cy.get("[id=isbn-update-field]").clear();
    cy.get("[id=description-update-field]").clear();

    // update the new book
    cy.get("[id=title-update-field]").type("An Updated Book");
    cy.get("[id=author-update-field]").type("An Updated Author");
    cy.get("[id=isbn-update-field]").type("An Updated ISBN");
    cy.get("[id=description-update-field]").type("An Updated Description");

    cy.get("[id=test-update-button]").click();

    // go to library
    cy.get("[id=browse-library-link]").click();

    // navigate to the checkout/user book page
    cy.get("[id=user-book-row]").first().click();
    
    
    // check changes are reflected in library
    cy.get("[id=test-browse-title]").first().contains("An Updated Book");
    cy.get("[id=test-browse-author]").first().contains("An Updated Author");
    cy.get("[id=test-browse-isbn]").first().contains("An Updated ISBN");
    cy.get("[id=test-browse-description]").first().contains("An Updated Description");

    cy.get("[id=book-is-available]").should("be.visible");
    // cy.get("[id=book-not-available]").should("not.be.visible");

    cy.get("[id=test-checkout-button]").click();

    // check that book is now checked out
    cy.get("[id=test-library-book-title]").first().contains("An Updated Book")
    cy.get("[id=book-not-available]").first().should("be.visible");

    // check that all of our books (past and current) are shown in our profile
    cy.get("[id=profile-link]").click();
    cy.get("[id=test-my-book-title]").should('have.length', 1);

    cy.get("[id=return-button]").click();
    cy.get("[id=test-my-book-title]").should('have.length', 0);
    

    // go to admin dashboard
    cy.get("[id=admin-link]").click();
    // navigate to the admin book page
    cy.get("[id=admin-book-row]").first().click();

    // go to admin dashboard
    cy.get("[id=test-delete-button]").click();
    
    // check that the book wwas deleted
    cy.get("[id=admin-book-row]").should('have.length', 6);
    
  });
});
