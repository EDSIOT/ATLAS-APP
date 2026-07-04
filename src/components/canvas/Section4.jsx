import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';


import { Plane,Sparkles,OrbitControls, Preload, ScrollControls,Float, useGLTF, useScroll,Text, useTexture, Center, Decal, Text3D, Billboard,Svg } from '@react-three/drei';



const Atlas = ({ ...props }) => {

  const pointLightRef = useRef();
  const Atlas = useGLTF('./3Dmodels/atlas/scene.gltf')
  
  return (
    <mesh {...props} >
  
        <primitive  object={Atlas.scene} scale={0.1} position={[0,-7,5]} rotation-x={-0.5}   />
        <pointLight intensity={2} 
      position={ [5,-50,-20] } ref={pointLightRef} />
        <pointLight position={[10,30,10]} intensity={2}    />
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
    /*onClick={handleClick('https://www.instagram.com/halvor.j') }*/
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
    /*onClick={handleClick('https://www.instagram.com/halvor.j')}*/
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
  return (
      < >
      <Links {...props} />
      <Atlas  {...props} />

      <Center {...props} position={[0,0,55]}>
      <Float >
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
            <meshPhysicalMaterial
              transparent
              opacity={0.2}
              iridescence={1}
              iridescenceIOR={3}
              iridescenceThicknessRange={[100, 500]}
              roughness={0.5}
              metalness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.5}
            />
          </Text3D>
          <Float
          floatIntensity={0.5}
          speed={0.5}
          >
            <Text3D
              position-x={1}
              position-y={-0.2}
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
              {`\nNous!`}
              <meshPhysicalMaterial
                color="#FF8F20"
                transparent
                opacity={0.6}
                iridescence={1}
                iridescenceIOR={1.3}
                iridescenceThicknessRange={[100, 400]}
                roughness={0.1}
                metalness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Text3D>
          </Float>
      </Float>

      </Center>
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