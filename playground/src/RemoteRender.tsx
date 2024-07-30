import React, { Suspense, memo, useEffect, useState } from 'react'

async function loadScript(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      resolve(null)
    }
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${url}`))
    }
    document.head.appendChild(script)
  })
}

const ComponentBlockLoading: React.FC = () => {
  return <div>loading</div>
}

const RemoteRender: React.FC = () => {
  const [Component, setComponent] = useState({
    component: ComponentBlockLoading,
  })

  useEffect(() => {
    loadScript('https://unpkg.com/@coderbaozi/ui-components@1.0.0/dist/components/Button.js').then(() => {
      setComponent({ component: window.REMOTE.Button })
    })
  }, [])

  return (
    <Suspense fallback={<ComponentBlockLoading />}>
      <Component.component />
    </Suspense>
  )
}

export default memo(RemoteRender)
