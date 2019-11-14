import React from 'react'
import NotFound from './notfound'

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
      // You can also log the error to an error reporting service
      console.log(error)
      console.log(errorInfo)
    }
  
    render() {
        console.log(this.state.hasError);
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <NotFound/>;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;