import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Pointer move
  useEffect(() => {
    console.log('Effect', { enabled })

    const handleMove = (e) => {
      const { clientX, clientY } = e
      console.log(clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // - CleanUp
    // - Esto se ejecuta cuando se desmonta el componente (Ejemplo en el componente App)
    // - Y también se ejecuta cuando cambia el estado de las dependencias.
    return () => {
      console.log('cleanUp')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // - El segundo parámetro del useEffect:
  // - [] -> Solo se ejecuta cuando se monta el componente.
  // - [enabled] -> Se ejecuta cada vez que cambia el estado de enabled, y cuando se monta el componente.
  // - undefined -> Se ejecuta cada vez que se renderiza el componente.
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <h2>Mouse Follower</h2>
      <button onClick={() => { setEnabled(!enabled) }}>{enabled ? 'Desactivar' : 'Activar'} el seguimiento del puntero</button>
    </>
  )
}

function App () {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      {
        mounted && <FollowMouse />
      }
      <button onClick={() => { setMounted(!mounted) }}>Toogle mounted FollowMouse Component</button>
    </main>
  )
}

export default App
