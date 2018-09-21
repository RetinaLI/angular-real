import { QeModule } from './qe.module';

describe('QeModule', () => {
  let qeModule: QeModule;

  beforeEach(() => {
    qeModule = new QeModule();
  });

  it('should create an instance', () => {
    expect(qeModule).toBeTruthy();
  });
});
