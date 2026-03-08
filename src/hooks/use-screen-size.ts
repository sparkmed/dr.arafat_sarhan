import { useState, useEffect } from 'react'

const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    ...windowSize,
    lessThan: (size: 'sm' | 'md' | 'lg' | 'xl') => {
      const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 }
      return windowSize.width < breakpoints[size]
    },
  }
}

export default useScreenSize
