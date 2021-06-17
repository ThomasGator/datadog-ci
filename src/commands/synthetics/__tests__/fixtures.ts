import {MainReporter, PollResult, Test, User, Step} from '../interfaces'

const mockUser: User = {
  email: '',
  handle: '',
  id: 42,
  name: '',
}

export const mockReporter: MainReporter = {
  error: jest.fn(),
  initErrors: jest.fn(),
  log: jest.fn(),
  reportStart: jest.fn(),
  runEnd: jest.fn(),
  testEnd: jest.fn(),
  testTrigger: jest.fn(),
  testWait: jest.fn(),
}

export const getApiTest = (publicId: string): Test => ({
  config: {
    assertions: [],
    request: {
      headers: {},
      method: 'GET',
      timeout: 60000,
      url: 'http://fake.url',
    },
    variables: [],
  },
  created_at: '',
  created_by: mockUser,
  locations: [],
  message: '',
  modified_at: '',
  modified_by: mockUser,
  monitor_id: 0,
  name: '',
  options: {
    device_ids: [],
    min_failure_duration: 0,
    min_location_failed: 0,
    tick_every: 3600,
  },
  overall_state: 0,
  overall_state_modified: '',
  public_id: publicId,
  status: '',
  stepCount: 0,
  subtype: 'http',
  tags: [],
  type: 'api',
})

export const getStep = (): Step => ({
  browserErrors: [],
  vitalsMetrics: [
    {
      url: 'http://fake.url',
      lcp: 1,
      cls: 1,
    },
  ],
  skipped: false,
  description: 'description',
  warnings: [],
  url: 'about:blank',
  value: 'value',
  duration: 1000,
  allowFailure: false,
  type: 'type',
  stepId: -1,
})

export const getResult = (): PollResult => ({
  dc_id: 1,
  resultID: '123',
  timestamp: 1,
  result: {
    device: {
      height: 1,
      id: 'chrome',
      width: 1,
    },
    eventType: 'event',
    passed: true,
    stepDetails: [],
  },
})
