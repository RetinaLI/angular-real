import { LogisticReportModule } from './logistic-report.module';

describe('LogisticReportModule', () => {
  let logisticReportModule: LogisticReportModule;

  beforeEach(() => {
    logisticReportModule = new LogisticReportModule();
  });

  it('should create an instance', () => {
    expect(logisticReportModule).toBeTruthy();
  });
});
