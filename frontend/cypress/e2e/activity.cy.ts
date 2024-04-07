describe('activity', () => {
  beforeEach(() => {
    cy.visit('activity');
  });

  it('should display 5 results in a table', () => {});

  it('should display the correct columns', () => {});

  it('should be possible to click on a row', () => {});

  context('after selecting a row', () => {
    beforeEach(() => {
      cy.visit('activity/D-1567');
    });

    it('should display the details of the activity and a pie chart', () => {});

    it('should display the correct detail properties of the activity', () => {});

    it('should show the correct data in the pie chart', () => {});
  });
});
