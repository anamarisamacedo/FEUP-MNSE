const Jam = require('../../entities/jam');

describe('Jam tests', () => {
  describe('test calculateGamePlan', () => {
    test('2 measures, 3 users, 3 instruments', () => {
      const jam = new Jam('A', {
        instruments: ['instrument 1', 'instrument 2', 'instrument 3'],
        measures: 2,
      });
      jam.users = ['A', 'B', 'C'];

      const plan = jam.calculateGamePlan();

      expect(plan).toEqual([
        { player: 'A', measure: 0, instrument: 'instrument 1' },
        { player: 'B', measure: 0, instrument: 'instrument 2' },
        { player: 'C', measure: 0, instrument: 'instrument 3' },
        { player: 'A', measure: 1, instrument: 'instrument 1' },
        { player: 'B', measure: 1, instrument: 'instrument 2' },
        { player: 'C', measure: 1, instrument: 'instrument 3' },
      ]);
    });

    test('2 measures, 3 users, 4 instruments', () => {
      const jam = new Jam('A', {
        instruments: ['instrument 1', 'instrument 2', 'instrument 3', 'instrument 4'],
        measures: 2,
      });
      jam.users = ['A', 'B', 'C'];

      const plan = jam.calculateGamePlan();

      expect(plan).toEqual([
        { player: 'A', measure: 0, instrument: 'instrument 1' },
        { player: 'B', measure: 0, instrument: 'instrument 2' },
        { player: 'C', measure: 0, instrument: 'instrument 3' },
        { player: 'A', measure: 0, instrument: 'instrument 4' },
        { player: 'B', measure: 1, instrument: 'instrument 1' },
        { player: 'C', measure: 1, instrument: 'instrument 2' },
        { player: 'A', measure: 1, instrument: 'instrument 3' },
        { player: 'B', measure: 1, instrument: 'instrument 4' },
      ]);
    });

    test('2 measures, 3 users, 2 instruments', () => {
      const jam = new Jam('A', {
        instruments: ['instrument 1', 'instrument 2'],
        measures: 2,
      });
      jam.users = ['A', 'B', 'C'];

      const plan = jam.calculateGamePlan();

      expect(plan).toEqual([
        { player: 'A', measure: 0, instrument: 'instrument 1' },
        { player: 'B', measure: 0, instrument: 'instrument 2' },
        { player: 'C', measure: 1, instrument: 'instrument 1' },
        { player: 'A', measure: 1, instrument: 'instrument 2' },
      ]);
    });

    test('2 measures, 4 users, 2 instruments', () => {
      const jam = new Jam('A', {
        instruments: ['instrument 1', 'instrument 2'],
        measures: 2,
      });
      jam.users = ['A', 'B', 'C', 'D'];

      const plan = jam.calculateGamePlan();

      expect(plan).toEqual([
        { player: 'A', measure: 0, instrument: 'instrument 1' },
        { player: 'B', measure: 0, instrument: 'instrument 2' },
        { player: 'C', measure: 1, instrument: 'instrument 1' },
        { player: 'D', measure: 1, instrument: 'instrument 2' },
      ]);
    });

    test('2 measures, 2 users, 4 instruments', () => {
      const jam = new Jam('A', {
        instruments: ['instrument 1', 'instrument 2', 'instrument 3', 'instrument 4'],
        measures: 2,
      });
      jam.users = ['A', 'B'];

      const plan = jam.calculateGamePlan();

      expect(plan).toEqual([
        { player: 'A', measure: 0, instrument: 'instrument 1' },
        { player: 'B', measure: 0, instrument: 'instrument 2' },
        { player: 'A', measure: 0, instrument: 'instrument 3' },
        { player: 'B', measure: 0, instrument: 'instrument 4' },
        { player: 'A', measure: 1, instrument: 'instrument 1' },
        { player: 'B', measure: 1, instrument: 'instrument 2' },
        { player: 'A', measure: 1, instrument: 'instrument 3' },
        { player: 'B', measure: 1, instrument: 'instrument 4' },
      ]);
    });
  });
});
