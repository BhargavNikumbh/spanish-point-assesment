describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://www.matchingengine.com/");

    // Accept Cookies
    cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();

    cy.get(".SPTNavigation_burgerBtn__AhPdm").click();

    cy.get(".MainNavLink_row__3cGfi").eq(4).click();

    cy.get(".SubNavLink_subRoot__jqzFL").eq(1).click();
    cy.contains("Additional Features").scrollIntoView().should("be.visible");
    cy.get("Products Supported").click();
  });
});
