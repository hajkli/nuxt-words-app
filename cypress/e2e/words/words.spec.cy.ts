describe("End-to-End Test for Login and Adding Words", () => {
	it("should login, navigate to words, and add a new word", () => {
		// Login
		cy.visit("/");
		cy.wait(1000);
		cy.get("#username").type("validUser");
		cy.get("#login").click();

		// Navigate to words
		cy.url().should("include", "/words");
		cy.get("#add-new-word").should("exist");
		cy.get("#new-word").should("exist");
		cy.get(".word-list-container").should("exist");

		// Add a new word
		cy.wait(1000);
		cy.get('input[id="new-word"]').type("testword");
		cy.get('button[id="add-new-word"]').click();

		//Test if the word is added
		cy.get(".word-list-container").should("contain", "testword");

		//Try to delete the word
		cy.get('.word-card:contains("testword") button').click();

		//Cancel deletion
		cy.get(".modal #confirmation-modal-cancel").click();
		cy.get(".word-list-container").should("not.contain", "testword");

		// Confirm deletion
		cy.get(".modal #confirmation-modal-confirm").click();
		cy.get(".word-list-container").should("not.contain", "testword");
	});
});
