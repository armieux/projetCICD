import apiService from './../../src/services/apiService';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('apiService', () => {
    it('fetchGroups calls fetch and returns an array', async () => {
        const groups = await apiService.fetchGroups();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(groups).toEqual([]);
    });

    // Add more tests for each function in apiService
});