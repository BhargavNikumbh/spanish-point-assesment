import CardContent from "../interfaces/CardContent";

class DistributionProcessingPage {
  getSection(sectionTitle: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .contains("h2", sectionTitle)
      .scrollIntoView()
      .should("be.visible")
      .closest("section");
  }

  getSectionCards(sectionTitle: string): Cypress.Chainable<CardContent[]> {
    return cy
      .contains("h2", sectionTitle)
      .closest("section")
      .find(".Card_content__S6jz_")
      .then(($cards) => {
        const cleanText = (text: string): string => {
          return text.replace(/\s+/g, " ").trim();
        };
        return [...$cards].map((card) => ({
          title: cleanText(card.querySelector("h5")?.textContent?.trim() ?? ""),
          body: cleanText(card.querySelector("p")?.textContent?.trim() ?? ""),
        }));
      });
  }

  getSectionListItems(sectionTitle: string): Cypress.Chainable<string[]> {
    return cy
      .contains("h2", sectionTitle)
      .closest("section")
      .find("ul li")
      .then(($items) => {
        return [...$items].map((item) => item.textContent?.trim() ?? "");
      });
  }
}

export default DistributionProcessingPage;
