const AGE_BRACKET = [
    { from: 0, to: 20, score: 8 }, // these set are under parent supervision and would have high priority
    { from: 21, to: 60, score: 6 }, // these are the busy ones
    { from: 61, to: 80, score: 10 }, // these are the retired ones with time and availability
    { from: 81, to: 200, score: 5 } // these set need care and if no one is available to help
  ];

  module.exports = { AGE_BRACKET };