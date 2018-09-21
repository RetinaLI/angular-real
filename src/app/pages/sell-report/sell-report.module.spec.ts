import { SellReportModule } from './sell-report.module';

describe('SellReportModule', () => {
  let sellReportModule: SellReportModule;

  beforeEach(() => {
    sellReportModule = new SellReportModule();
  });

  it('should create an instance', () => {
    expect(sellReportModule).toBeTruthy();
  });
});
