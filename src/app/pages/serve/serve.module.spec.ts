import { ServeModule } from './serve.module';

describe('ServeModule', () => {
  let serveModule: ServeModule;

  beforeEach(() => {
    serveModule = new ServeModule();
  });

  it('should create an instance', () => {
    expect(serveModule).toBeTruthy();
  });
});
