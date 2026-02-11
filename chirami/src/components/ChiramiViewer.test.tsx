import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChiramiViewer } from './ChiramiViewer';
import { chiramiStore, type LogItem } from '../core/ChiramiStore';

vi.mock('../core/ChiramiStore', () => {
  return {
    chiramiStore: {
      init: vi.fn(),
      subscribe: vi.fn(),
      getLogs: vi.fn(),
      getTotalCount: vi.fn(),
      clear: vi.fn(),
    },
  };
});

describe('ChiramiViewer', () => {
  let subscribeCallback: (logs: LogItem[]) => void;

  beforeEach(() => {
    vi.clearAllMocks();

    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    (chiramiStore.getTotalCount as any).mockReturnValue(0);
    (chiramiStore.getLogs as any).mockReturnValue([]);
    (chiramiStore.subscribe as any).mockImplementation((callBack: any) => {
      subscribeCallback = callBack;
      callBack([]);
      return vi.fn();
    });
  });

  it('renders closed state initially', () => {
    // GIVEN
    (chiramiStore.getTotalCount as any).mockReturnValue(5);

    // WHEN
    render(<ChiramiViewer />);

    // THEN
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    
    expect(chiramiStore.init).toHaveBeenCalled();
    expect(chiramiStore.subscribe).toHaveBeenCalled();
  });

  it('opens viewer when clicked', () => {
    // GIVEN
    render(<ChiramiViewer />);

    // WHEN
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // THEN
    expect(screen.getByText('Close ▼')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('displays logs', () => {
    // GIVEN
    render(<ChiramiViewer />);
    fireEvent.click(screen.getByRole('button'));

    const mockLogs: LogItem[] = [
      {
        id: '1',
        type: 'log',
        args: ['Hello World'],
        timestamp: Date.now(),
      },
      {
        id: '2',
        type: 'error',
        args: ['Error Occurred'],
        timestamp: Date.now(),
      }
    ];

    // WHEN
    act(() => {
      subscribeCallback(mockLogs);
    });

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('Error Occurred')).toBeInTheDocument();
  });

  it('clears logs when Clear button is clicked', () => {
    // GIVEN
    render(<ChiramiViewer />);
    fireEvent.click(screen.getByRole('button')); 

    // WHEN
    const clearBtn = screen.getByText('Clear');
    fireEvent.click(clearBtn);

    // THEN
    expect(chiramiStore.clear).toHaveBeenCalled();
  });

  it('closes viewer when Close button is clicked', () => {
    // GIVEN
    render(<ChiramiViewer />);
    fireEvent.click(screen.getByRole('button')); 

    // WHEN
    const closeBtn = screen.getByText('Close ▼');
    fireEvent.click(closeBtn);

    // THEN
    expect(screen.queryByText('Close ▼')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('scrolls to bottom on new logs', () => {
    // GIVEN
    const scrollMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollMock;

    render(<ChiramiViewer />);
    fireEvent.click(screen.getByRole('button')); 

    // WHEN
    act(() => {
      subscribeCallback([{ id: '1', type: 'info', args: ['test'], timestamp: Date.now() }]);
    });

    // THEN
    // Check if scrollIntoView was called. Note: might be called multiple times due to renders.
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
