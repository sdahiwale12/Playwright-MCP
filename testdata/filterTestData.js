const filterTestData = {
  search: {
    term: 'sneakers',
    urlParam: 'search?query=sneakers',
  },
  price: {
    min: 50,
    max: 150,
  },
  colors: [
    { name: 'Black', id: 4, labelSelector: 'label[aria-label="Black"]', inputSelector: 'input#filter_23_option_\\ 4' },
    { name: 'Blue', id: 5, labelSelector: 'label[aria-label="Blue"]', inputSelector: 'input#filter_23_option_\\ 5' },
  ],
  sizes: [
    { name: 'M', id: 7, labelSelector: 'label[aria-label="M"]', inputSelector: 'input#filter_24_option_\\ 7' },
    { name: 'XL', id: 9, labelSelector: 'label[aria-label="XL"]', inputSelector: 'input#filter_24_option_\\ 9' },
  ],
  brands: [
    { name: 'Elegance', id: 38, labelSelector: "label[aria-label='Elegance']", inputSelector: "input#filter_25_option_\\ 38" },
  ],
  filterSearch: {
    query: 'bl',
    expectedVisible: ['Blue', 'Black'],
    expectedHidden: ['Red', 'Green'],
  },
  timeouts: {
    filterApply: 1500,
    pageLoad: 1000,
  },
};

module.exports = filterTestData;