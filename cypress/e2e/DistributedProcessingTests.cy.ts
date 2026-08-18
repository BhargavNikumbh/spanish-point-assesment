import CardContent from "../interfaces/CardContent";
import DistributionProcessingPage from "../pages/DistributionProcessingPage";
import Homepage from "../pages/Homepage";
import Navbar from "../pages/Navbar";

describe("Distribution Processing", () => {
  const navbar = new Navbar();
  const distributionProcessingPage = new DistributionProcessingPage();
  const homePage = new Homepage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  /**
   * Verify the Solutions list displayed in the navigation
   */
  it("Test 1: Should display the correct Solutions list", () => {
    cy.fixture("NavbarFixture").then((fixture) => {
      // Expand Solutions
      navbar.expandSolutions();

      // Get and verify Solutions
      navbar.getSolutions().then((actualSolutions) => {
        const expectedSolutions = Object.values(fixture.NavbarSolutions);
        expect(actualSolutions).to.deep.equal(expectedSolutions);
      });
    });
  });

  /**
   * Verify the All-in-one solution for scale section
   */
  it("Test 2: Should verify All-in-one solution for scale cards", () => {
    cy.fixture("DistributedProcessingPageFixture").then((fixture) => {
      const testData = fixture;

      // Navigate to Distribution Processing
      cy.fixture("NavbarFixture").then((NavbarFixture) => {
        navbar.goTo(NavbarFixture.NavbarSolutions.DistributionProcessing);
      });

      // Scroll to All-in-one solution for scale
      distributionProcessingPage.getSection(
        testData.AllInOneSolutionForScale.title,
      );

      // Get actual card titles
      distributionProcessingPage
        .getSectionCards(testData.AllInOneSolutionForScale.title)
        .then((actualCards) => {
          const expectedCards = Object.values(
            testData.AllInOneSolutionForScale,
          ).filter(
            (item): item is CardContent =>
              typeof item === "object" &&
              item !== null &&
              !Array.isArray(item) &&
              "title" in item &&
              "body" in item,
          );

          expect(actualCards).to.deep.equal(expectedCards);
        });
    });
  });

  it("Test3: Verify All-in-one solution for scale title", () => {
    cy.fixture("DistributedProcessingPageFixture").then((fixture) => {
      const testData = fixture.AllInOneSolutionForScale;

      navbar.goTo("Distribution processing");

      distributionProcessingPage
        .getSection(testData.title)
        .find("h2")
        .should("have.text", testData.title);
    });
  });

  it("Test 4: Verify distribution processing benefits", () => {
    cy.fixture("DistributedProcessingPageFixture").then((fixture) => {
      const testData = fixture.AllInOneSolutionForScale;

      navbar.goTo("Distribution processing");

      distributionProcessingPage
        .getSectionListItems(testData.title)
        .then((actualItems) => {
          expect(actualItems).to.deep.equal(
            testData.distributionProcessingBenefits,
          );
        });
    });
  });
});
