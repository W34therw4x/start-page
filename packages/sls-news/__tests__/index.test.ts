import { fetchNewsHandler } from './../src/index';
jest.setTimeout(30000);
// need fixture with proper page html and selectors
describe('when it recieves valid SNS message with proper selectors', () => {
  describe('and no options set', () => {
    it('return an array of all news content objects scraped from page and success status code', async () => {
      // const expectedResponse:

      const event = {
        Records: [
          {
            Sns: {
              Message: JSON.stringify({
                message: {
                  selectors: {
                    container: '.postItem + div',
                    description: 'a > div',
                    link: 'a',
                    title: 'h3 div'
                  },
                  url: 'https://hackernoon.com/latest-tech-stories/home'
                }
              })
            }
          }
        ]
      };
      const scrapedData = await fetchNewsHandler(event);
      // expect(scra)
    });
  });

  //   // need fixture with proper page html and selectors
  //   describe("and limit number option set", () => {
  //     it("return an array of fixed amount of news content objects scraped from page and success status code", () => {
  //       alert("asdf");
  //     });
  //   });

  //   // need fixture with proper page html and selectors
  //   describe("and initial action option", () => {
  //     it("perform initial actions before scraping news from page", () => {
  //       alert("asdf");
  //     });
  //   });
  // });

  // describe("when it recieves valid SNS message with selectors that are not found on page", () => {
  //   // need fixture with wrong page html/selectors
  //   it("return an error status code and description what went wrong", () => {
  //     alert("asdf");
  //   });
  // });

  // describe("when it recieves invalid SNS message", () => {
  //   // need fixture with wrong page html/selectors
  //   it("return an error status code and description what went wrong", () => {
  //     alert("asdf");
  //   });
});
