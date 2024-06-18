import { useCallback, useEffect, useMemo, useState } from 'react'

export enum EBreakpoints {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XXL = 1536,
}
type UseDevice = {
  orientation: 'portrait' | 'landscape'
  isMobile: boolean
  isDesktop: boolean
  isPortrait: boolean
  isLandscape: boolean
  isMediumSize: boolean
  height: number
  width: number
  isXS: boolean
  isSM: boolean
  isMD: boolean
  isLG: boolean
  isXL: boolean
  isXXL: boolean
}

type Breakpoints = 'xs' | 'sm' | 'lg' | 'md' | 'xl' | 'xxl'

export const useDevice = (): UseDevice => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(getOrientation())
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  const isMobile = useMemo(() => windowWidth < 768, [windowWidth])

  useEffect(() => {
    function handleOrientationChange() {
      setOrientation(getOrientation())
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [])

  const confirmBreakpoint = useCallback(
    (breakpoint: Breakpoints) => {
      const validations = {
        xs: () => windowWidth < EBreakpoints.SM,
        sm: () => windowWidth >= EBreakpoints.SM && windowWidth < EBreakpoints.MD,
        md: () => windowWidth >= EBreakpoints.MD && windowWidth < EBreakpoints.LG,
        lg: () => windowWidth >= EBreakpoints.LG && windowWidth < EBreakpoints.XL,
        xl: () => windowWidth >= EBreakpoints.XL && windowWidth < EBreakpoints.XXL,
        xxl: () => windowWidth >= EBreakpoints.XXL,
      }
      return validations[breakpoint]()
    },
    [windowWidth],
  )

  return {
    isMobile,
    isMediumSize: !isMobile,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    orientation,
    height: windowHeight,
    width: windowWidth,
    isDesktop:
      !/Android|iPhone/i.test(navigator.userAgent) ||
      /\/\/localhost(?=[:/]|$)/.test(window.location.origin),
    isXS: confirmBreakpoint('xs'),
    isSM: confirmBreakpoint('sm'),
    isMD: confirmBreakpoint('md'),
    isLG: confirmBreakpoint('lg'),
    isXL: confirmBreakpoint('xl'),
    isXXL: confirmBreakpoint('xxl'),
  }
}

function getOrientation() {
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
}
