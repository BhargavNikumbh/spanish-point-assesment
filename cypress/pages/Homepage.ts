class Homepage {
  private cookieAcceptButton =
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll";

  acceptCookies(): void {
    cy.get(this.cookieAcceptButton).click();
  }

  visit(): void {
    cy.fixture("Url").then((URL) => {
      cy.visit(URL.URL);
    });
  }
}

export default Homepage;
