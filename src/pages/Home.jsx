import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import Loader from '../components/Loader'
import Desk from '../models/Desk'
import { Sky } from '../models/Sky'
import Skater from '../models/Skater'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">Popup</div> */}
const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustDeskForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -1.5, 0]
    let deskRotation = [0.1, 4.7, 0]

    if(window.innerWidth < 768) {
      screenScale = [4, 4, 4];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, deskRotation];
  }
  const adjustSkaterForScreenSize = () => {
    let screenScale, screenPosition = [0, -2, 2];

    if(window.innerWidth < 768) {
      screenScale = [0, 0, 0];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition];
  }

  const [deskScale, deskPosition, deskRotation] = adjustDeskForScreenSize();
  const [skaterScale, skaterPosition] = adjustSkaterForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <Canvas 
      className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight position={[10, 10, 1]} intensity={3}/>
          <ambientLight intensity={1} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" />
          <Desk 
            position={deskPosition}
            scale={deskScale}
            setCurrentStage={setCurrentStage}
            // rotation={deskRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Sky />
          <Skater position={skaterPosition} 
          scale={skaterScale} 
          isRotating={isRotating}
          rotation={[0, 5, 0]} />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home