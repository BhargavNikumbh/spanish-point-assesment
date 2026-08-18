class Navbar {
  private burgerButton = ".SPTNavigation_burgerBtn__AhPdm";
  private solutionsDropdownLink = ".MainNavLink_row__3cGfi";
  private solutionOptionLinks = "div.SubNavLink_subRoot__jqzFL";

  goTo(text: string): void {
    this.expandSolutions();
    cy.get(this.solutionOptionLinks).contains(text).click();
  }

  expandSolutions(): void {
    cy.get(this.burgerButton).click();
    cy.get(this.solutionsDropdownLink).eq(4).click();
  }

  getSolutions(): Cypress.Chainable<string[]> {
    return cy
      .get(this.solutionOptionLinks)
      .filter(":visible")

      .then(($elements) => {
        return [...$elements].map((element) => element.innerText.trim());
      });
  }

  selectSolution(solution: string): void {
    cy.contains(this.solutionOptionLinks, solution).filter(":visible").click();
  }
}

export default Navbar;
