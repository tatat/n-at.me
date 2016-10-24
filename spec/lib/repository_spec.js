import { Repository } from 'repository';

describe('Repository', () => {
  describe('#findById', () => {
    var repository = null;
    var targetId = 'TARGET_ID';

    it('should return data that has specified id (array)', () => {
      repository = new Repository([
        {id: [targetId]},
        {id: [`NOT_${targetId}`]},
      ]);

      expect(repository.findById(targetId)).toEqual({id: [targetId]});
    });

    it('should return data that has specified id (string)', () => {
      repository = new Repository([
        {id: targetId},
        {id: `NOT_${targetId}`},
      ]);

      expect(repository.findById(targetId)).toEqual({id: targetId});
    });
  });

  describe('#selectByCategory', () => {
    var repository = null;
    var targetCategory = 'CATEGORY';

    beforeEach(() => {
      repository = new Repository([
        {id: 'ID_01', category: targetCategory},
        {id: 'ID_02', category: targetCategory},
        {id: 'ID_03', category: `NOT_${targetCategory}`},
      ]);
    });

    it('should return data that has specified category', () => {
      const result = repository.selectByCategory(targetCategory);

      expect(result.length).toEqual(2);
      expect(result.map(d => d.id)).toEqual(['ID_01', 'ID_02']);
    });
  });
});
