import Navbar from "../pages/Navbar";
import RepertoireManagementPage from "../pages/RepertoireManagementPage";
import Homepage from "../pages/Homepage";

describe("Matching Engine Tests", () => {
  const homePage = new Homepage();
  const navbar = new Navbar();
  const repertoireManagementPage = new RepertoireManagementPage();

  beforeEach(() => {
    homePage.visit();
  });

  it("Repertoire Management Test", () => {
    homePage.visit();

    homePage.acceptCookies();

    cy.fixture("NavbarFixture").then((NavbarFixture) => {
      navbar.goTo(NavbarFixture.NavbarSolutions.RepertoireManagement);
    });

    repertoireManagementPage.goToSection("Additional Features");
    repertoireManagementPage.getElement("Products Supported").click();
  });
});
