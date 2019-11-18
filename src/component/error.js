import React from 'react'
import NotFound from './NotFound'

// Global Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log(error)
      console.log(errorInfo)
    }

    render() {
        console.log(this.state.hasError);
      if (this.state.hasError) {
        return <NotFound/>;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;