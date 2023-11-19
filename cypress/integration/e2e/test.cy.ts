beforeEach(() => {
  // cy.visit(Cypress.env("baseUrl")) 

  // zkratka do 4. kroku
  cy.visit(
    "https://www.srovnejto.cz/pujcky-a-uvery/pujcka-na-miru/srovnani?loanAmount=150000&id=1cHAB84pRMD9nKbSAWhFaA%3D%3D#krok-4"
  )
  cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click()
})

describe("should get to combobox", () => {
  it("should select value from listbox and auto-fill city and psč", () => {
    typeIntoTextField("Ulice a č.p.", "Sokolská stezka", { delay: 50 })

    cy.get("tr > td")
      .contains("Sokolská stezka 480")
      .click()
      .then((el) => expect(el).to.not.exist)

    checkTextFieldValue("Město", "Česká Kamenice")
    checkTextFieldValue("PSČ", "40721")
  })
})

/**
 * Selects form control text field and type value
 * @param label label of the form field
 * @param inputText value that will be typed into text field
 * @param options optional options
 */
function typeIntoTextField(label: string, inputText: string, options?: Partial<Cypress.TypeOptions>) {
  cy.get("label")
    .contains(label)
    .parent()
    .parent()
    .find("input")
    .type(inputText, options)
}

/**
 * Checks that text field value is expected, based on targeted label
 * @param label label of the form field
 * @param expectedValue value expected in text field
 */
function checkTextFieldValue(label: string, expectedValue: string) {
  cy.get("label")
    .contains(label)
    .parent()
    .parent()
    .find("input")
    .should("have.value", expectedValue)
}
