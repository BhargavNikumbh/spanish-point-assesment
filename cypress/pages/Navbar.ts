class Navbar {
  private burgerButton = ".SPTNavigation_burgerBtn__AhPdm";
  private solutionsDropdownLink = ".MainNavLink_row__3cGfi";
  private solutionOptionLinks = ".SubNavLink_subRoot__jqzFL";

  goTo(text: string): void {
    cy.get(this.burgerButton).click();
    cy.get(this.solutionsDropdownLink).eq(4).click();
    cy.get(this.solutionOptionLinks).contains(text).click();
  }
}

export default Navbar;
