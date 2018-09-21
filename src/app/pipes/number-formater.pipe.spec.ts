import { NumberFormaterPipe } from './number-formater.pipe';

describe('NumberFormaterPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberFormaterPipe();
    expect(pipe).toBeTruthy();
  });
});
