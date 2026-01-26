import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex flex-col items-center gap-2 max-w-lg">
          <div className="flex items-center gap-2">
            <strong>Player Error:</strong>
            <span>{this.state.error?.message || "Unknown error"}</span>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
