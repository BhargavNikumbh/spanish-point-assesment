class RepertoireManagementPage {
  private repertoireManagementPageSection: string = ".Section_section__kphW8";

  goToSection(text: string) {
    cy.contains(text).scrollIntoView().should("be.visible");
  }

  getElement(hasText: string) {
    return cy.get(hasText);
  }
}

export default RepertoireManagementPage;
