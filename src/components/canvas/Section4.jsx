import { useRef } from 'react';
import * as THREE from 'three';
import { useControls } from 'leva';

import { MeshTransmissionMaterial, Plane,Sparkles, Float, useGLTF, Text, Center, Text3D, Svg } from '@react-three/drei';

import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Atlas = ({ ...props }) => {

  const pointLightRef = useRef();
  const Atlas = useGLTF('./3Dmodels/atlas/scene.gltf')
  
  return (
    <mesh {...props} >
  
      <primitive  object={Atlas.scene} scale={0.1} position={[0,-7,5]} rotation-x={-0.5}   />
              {/* Lumière d'ambiance douce, évite les zones totalement noires */}
      <ambientLight intensity={2}/>

      {/* Lumière principale (key light) - simule le soleil/spot studio */}
      <directionalLight
        position={[0, 5, 20]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Lumière de remplissage (fill light) - adoucit les ombres du côté opposé */}
      <directionalLight
        position={[-5, 5, -5]}
        intensity={1.5}
      />

      {/* Lumière du dessus, pour l'effet studio/reflets sur matériaux physiques */}
      <pointLight position={[0, 8, 0]} intensity={2} />
        <Sparkles
        position-y={0}
        color="white"
        count={100}
        noise={1}
        opacity={1}
        scale={10}
        size={5}
        speed={0.3}
        />
                <Sparkles
        position-x={6}
        color="white"
        count={100}
        noise={1}
        opacity={1}
        scale={10}
        size={5}
        speed={0.3}
        />
        <Sparkles
        position-x={-6}
        color="white"
        count={100}
        noise={1}
        opacity={1}
        scale={10}
        size={5}
        speed={0.3}
        />
        
        
    </mesh>
  )
  }

const Links = ({ ...props }) => {
  const handleClick = (link) => {
    console.log('click');
    window.open(link);

  };
  
  return(

< group  position={[0,0,45]} >

<Float
rotation-y={-Math.PI }
speed={1.5} // Animation speed
rotationIntensity={0.1} // XYZ rotation intensity
floatIntensity={6} // Up/down float intensity
//floatingRange={[1, 1.1]} // Range of y-axis values the object will float 
>
  <Svg 
    onClick={() => handleClick('https://www.instagram.com/halvor.j')}
    fillMaterial={{wireframe: false}}
    position={[5.5,2,-6]}
    
    scale={0.05}
    src="./svg/instagram.svg"
    strokeMaterial={{
      wireframe: false
    }}/>
</Float>
<Float >
<Svg 
    onClick={() => handleClick('https://www.instagram.com/halvor.j')}
    fillMaterial={{wireframe: false}}
    position={[5,2,8]}
    
    scale={0.05 }
    src="./svg/facebook.svg"
    strokeMaterial={{
      wireframe: false
    }}/>
    </Float>

</group>
  )
  }

const Section4 = ({...props}) => {
      const materialProps = useControls({

        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0.1, min: 0, max: 1, step: 0.1 },

        transmission: {value: 1, min: 0, max: 1, step: 0.1},

        ior: { value: 3, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 1, min: 0, max: 1},

        backside: { value: true},

    })

  return (
      < >
      <Links {...props} />
      <Atlas  {...props} />
      <Float position={[-2,0,56]} >
        
          <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={0.7}
            textAlign='center'
            font="/Inter_Bold.json"
          >
            {`Contactes`}
            <MeshTransmissionMaterial {...materialProps}/>
          </Text3D>
          <Float
          floatIntensity={0.5}
          speed={0.5}
          >
            <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={0.7}
            textAlign='center'
            font="/Inter_Bold.json"
          >
            {`\n Nous!`}
            <MeshTransmissionMaterial {...materialProps}/>
          </Text3D>
          </Float>
      </Float>
      <group position={[0,-2,57]} >
 
      <Text  position-y={0.05} fontSize={0.08} color={"white"}
                      textAlign='center'
                      maxWidth={5}
      > {`Clique sur le logo correspondant au réseau de ton choix ;)`} </Text>
      
      <mesh>
        <Plane args={[2.2,0.12]} position-z={-0.1}  >
        <meshBasicMaterial color='black' transparent={true} opacity={0.8} />
        </Plane>
        
        </mesh> 
      </group>
    
    </>
  );
};

export default Section4