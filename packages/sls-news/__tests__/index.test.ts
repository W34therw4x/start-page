// use sdk mock for mocking sns msg

// need fixture with proper page html and selectors
describe('when it recieves SNS message with proper selectors and no options', () => {
  it('return an array of all news content objects scraped from page and success status code', () => {
    alert('asdf');
  });

  // it('add', () => {
  //   const result: number = 2 + 7;
  //   expect(result).toBe(9);
  // });
});

// need fixture with proper page html and selectors
describe('when it recieves SNS message with proper selectors and limit number option', () => {
  it('return an array of fixed amount of news content objects scraped from page and success status code', () => {
    alert('asdf');
  });
});

// need fixture with proper page html and selectors
describe('when it recieves SNS message with proper selectors and initial actions option', () => {
  it('perform initial actions before scraping news from page', () => {
    alert('asdf');
  });
});

// need fixture with wrong page html/selectors
describe('when it recieves SNS message with selectors that are not found on page', () => {
  it('return an error status code and description what went wrong', () => {
    alert('asdf');
  });
});
