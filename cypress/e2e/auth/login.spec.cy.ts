describe("Login Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should successfully login with valid credentials", () => {
		cy.get("#username").type("validUser");
		cy.get("#login").click();
		cy.url().should("include", "/words");
	});

	it("should display an error with invalid credentials", () => {
		cy.get("#username").type("a");
		cy.get("#login").click();
		cy.contains("Username must be at least 3 characters long").should(
			"be.visible"
		);
	});
});
