import Navbar from "../pages/Navbar";
import RepertoireManagementPage from "../pages/RepertoireManagementPage";
import Homepage from "../pages/Homepage";

describe("Matching Engine Tests", () => {
  const homePage = new Homepage();
  const navbar = new Navbar();
  const repertoireManagementPage = new RepertoireManagementPage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  /**
   * This test would fail as "Additional Features" section is not present on page
   */
  it("Repertoire Management Test", () => {
    cy.fixture("NavbarFixture").then((NavbarFixture) => {
      navbar.goTo(NavbarFixture.NavbarSolutions.RepertoireManagement);
    });

    repertoireManagementPage.goToSection("Additional Features");
    repertoireManagementPage.getElement("Products Supported").click();
  });

  /**
   * Test to compare title of Every card for a Section
   */

  it("Verify All-in-One section", () => {
    cy.fixture("NavbarFixture").then((NavbarFixture) => {
      navbar.goTo(NavbarFixture.NavbarSolutions.RepertoireManagement);
    });

    cy.fixture("RepertoireManagementPageFixture").then((fixture) => {
      repertoireManagementPage
        .getSectionCards(fixture.AllInOneSolutionForScale.title)
        .then((actualTitles) => {
          const expectedTitles = [
            fixture.AllInOneSolutionForScale.AvoidDuplicationCard.title,
            fixture.AllInOneSolutionForScale.ComplyWithInternationalStandards
              .title,
            fixture.AllInOneSolutionForScale.RunAnalyticsAndQueries.title,
            fixture.AllInOneSolutionForScale
              .ManageDifferentCollectionSharePictures.title,
            fixture.AllInOneSolutionForScale.MinimiseManualIntervention.title,
            fixture.AllInOneSolutionForScale.CollectDirectMemberRegistrations
              .title,
          ];

          expect(actualTitles).to.deep.equal(expectedTitles);
        });
    });
  });
});
