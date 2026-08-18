class Homepage {
  private cookieAcceptButton =
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll";
  private cookieDialog = "#CybotCookiebotDialogBodyContent";

  acceptCookies(): void {
    cy.get("body").then(($body) => {
      const button = $body.find(this.cookieAcceptButton);

      if (button.length > 0 && Cypress.$(button).is(":visible")) {
        cy.wrap(button).click();
      }
    });
  }

  visit(): void {
    cy.fixture("Url").then((URL) => {
      cy.visit(URL.URL);
    });
  }
}

export default Homepage;
