/// <reference types="cypress" />

describe('Booking.com Hotel Search', () => {
  let bookingSearch;

    before(() => {

      cy.fixture('booking-search').then((seacrhDetails) => {
      bookingSearch = seacrhDetails;
      });

      cy.visit('https://www.booking.com/')
    })
  
    it('should serach for specific hotel', () => {
      cy.get('.sb-searchbox__outer form input[type=search]').type(bookingSearch.cityName);
     
      //I used {force: true} because this element is covered by another element, but we can solve this using eq() instead contains(), too
      cy.get('.sb-searchbox__outer .sb-date-field.b-datepicker').contains('Check-in').click({force:true});
      cy.get('.sb-searchbox__outer .bui-calendar__date span[aria-label="26 February 2022"]').click();
      cy.get('.sb-searchbox__outer .bui-calendar__date span[aria-label="2 March 2022"]').click();

      cy.get('.sb-searchbox__outer .xp__guests__count').click();
      cy.get('.sb-searchbox__outer button[aria-label="Increase number of Children"]').click();
      cy.get('.sb-searchbox__outer select[name=age]').select(bookingSearch.childAge);

      cy.get('.sb-searchbox__outer button[type=submit]').click();

      cy.get('#basiclayout li button[aria-label=" 3"]').click();
      
      cy.get('#basiclayout h3 .fde444d7ef').should('contain', 'Agate Hôtel');
     })
  })

  