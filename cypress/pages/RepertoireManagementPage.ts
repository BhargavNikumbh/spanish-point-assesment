class RepertoireManagementPage {
  private repertoireManagementPageSection: string = ".Section_section__kphW8";

  private allInOneSolutionForScaleSection = "#repertoire-management-overview";

  private sectionCard = ".Card_content__S6jz_";

  goToSection(text: string) {
    cy.contains(text).scrollIntoView().should("be.visible");
  }

  getElement(hasText: string) {
    return cy.get(hasText);
  }

  getSectionCards(sectionTitle: string): Cypress.Chainable<string[]> {
    return cy
      .contains("h2", sectionTitle)
      .closest("section")
      .find("h5")
      .then(($cards) => {
        return [...$cards].map((card) =>
          (card.textContent ?? "").replace(/\s+/g, " ").trim(),
        );
      });
  }
}

export default RepertoireManagementPage;
