import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

import {styles} from './styles';
import {Section1 , Section2, Section3,Section4,Section5} from './canvas';
/**import { ComputerCanvas } from './canvas' ; */

import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import {Plane, Preload, useGLTF, Text, Center, Decal, Text3D, Billboard } from '@react-three/drei';
import CanvasLoader from './Loader';
import { MeshBasicMaterial, PlaneGeometry } from 'three';

/** loading of the objects */
const Gym = ({ ...props }) => {
  
  const Gym = useGLTF('./3Dmodels/gym_complex/gym_complex.glb')
  return (
    <mesh receiveShadow={true}>
      <primitive  object={Gym.scene} {...props} />
      <pointLight intensity={0.1} 
      position={ [5,-50,-20] }   />
        <pointLight position={[10,30,10]} intensity={0.5} castShadow={true}    />
    </mesh>
  )
}


const Section = ({text,hero, ...props}) => {
  const myMesh= useRef();
 return(
  <mesh ref={myMesh}  {...props}>
     <Center position-y={1}>
      <Text position-y={3} fontSize={1} color={"white"}
                          textAlign='center'
                          opacity={0}
                          outlineWidth={0.01}
                          outlineColor="black"
                          outlineOpacity={0.6}> {text} </Text>
      <group>
 
        <Text  fontSize={0.25} color={"white"}
                      textAlign='center'
                      outlineWidth={0.02}
                      outlineColor="black"
                      outlineOpacity={0.9}
                      maxWidth={5}
                      
        
        > {hero} </Text>
      </group>
      </Center>
      <mesh>
        <Plane args={[10,10]} position-z={-0.1}  >
        <meshBasicMaterial color='black' transparent={true} opacity={0.1} />
        </Plane>
        
        </mesh> 
  </mesh>

 )

}
 
function RotatingTorus({text, ...props}) {

  const myMesh= useRef();
  
  

  useFrame(({clock}) => {
    const a= clock.getElapsedTime()
    myMesh.current.rotation.x= a * 0.09
    myMesh.current.rotation.y= a* 0.1
    myMesh.current.rotation.z= a * 0.1
    
  });

  return (
    <mesh ref={myMesh}  {...props}>
    <torusGeometry args={ [ 2 , 0.5, 25, 70] }  />
    <meshNormalMaterial color='red'  />
    <Text 
    fontSize= {0.5}
    > {text}  </Text>

  </mesh>
  )

}


const WordMap = ({ words, dimensions }) => {
  const wordMeshes = useRef([]);
  
  useFrame(() => {
    const elapsedTime = window.performance.now() * 0.001;
    
    wordMeshes.current.forEach((mesh, index) => {
      
      
      const xPosition =  35+15*Math.sin( elapsedTime/25 )*(-1)**index;
      mesh.position.setX(xPosition);
    });
  });

  return (
    <group rotation-y={Math.PI / 2} position={[-10,-28,20]}  rotation-x={Math.PI / 5} >
      
        {words.map((word, index) => (
          <mesh
            key={index}
            position={[
              15,
              index*dimensions.height-5 ,
              0,
            ]}
            ref={(mesh) => (wordMeshes.current[index] = mesh)}
          >
              <Text fontSize={10} 
              color={index%2==0 ? "black" : "#FFFFFF80"}
              
              outlineColor="black"          
              outlineWidth={0.1}
              outlineOpacity={1} > {word} </Text>
          </mesh>
        ))}
      
    </group>
  );
};

const Wallpaper = () => {

  const wordList = [ 'FORCE/ PERSEVERANCE/ RESPECT/',
   'DETERMINATION/ PASSION/ COURAGE/',
    'TRAVAIL/ PERSEVERANCE/ PASSION/ COURAGE/', 
    'TRAVAIL/ PERSEVERANCE/ PASSION/ COURAGE/', 
    'FORCE/ PERSEVERANCE/ RESPECT/',
    'DETERMINATION/ PASSION/ COURAGE /',
];
  const mapDimensions = {
    width: 5,
    height: 8,
    columns: 3,
    rows: 10, // Adjust this based on the desired number of rows for the loop
    spacing: 1,
  };

  return <WordMap words={wordList} dimensions={mapDimensions} />;

  }

/* ********************************************** */
/*******************   SCENE    ******************* */
/*****************************************/

/** handling of the camera movements */


const CameraAnimation = ({ section }) => {
  const targetPosition = useRef({ x: 10, y: 0 , z: 0 });
  const targets = [ 
    {x: 0,y:1,z:-7},
    {x: 10,y:1,z:0},
    {x: 0,y:30,z:0},
    {x: 0,y:0,z:60},
    {x: 0,y:0,z:70},
   ];

   useEffect(() => {
    targetPosition.current = { ...targets[section] };
  }, [section]);

  useFrame((state) => {
    const step = 0.1;
    state.camera.position.lerp(targetPosition.current, step);
    state.camera.lookAt(0,1,0);
  });

  if (section==1)
  {return(<>
          <color attach="background" args={["#e5e5e5"]} />
          <Wallpaper />
  </>
  )}
  else 
  {return(<>
        <color attach="background" args={["black"]} />
  
  </>
  )
  }
  
};




const Content = () => {

  const { width, height } = useThree((state) => state.viewport)
  const margin = 0.5 ;

  return (
  <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]} rotation-y={[-3.14/2]}>
  <Text3D letterSpacing={-0.06} size={0.5} font="/Inter_Bold.json">
    bottom right
    <meshStandardMaterial color="white" />
  </Text3D>
</Center>
)
}


/**************************************** */

const BackgroundScene = () => {
  const [section, setSection] = useState(0);
  const [isHandlingWheel, setIsHandlingWheel] = useState(false);
  
  
  const handleWheel = (e) => {
    if (isHandlingWheel) {
      return; // Exit the function if it is already being handled
    }

    setIsHandlingWheel(false);
    
    
    const { deltaY } = e;
    const end = 3;
    if (deltaY >0 && section < end) {
      setSection((section) => section + 1);
      setIsHandlingWheel(true);              // wait to change section on each different srcolls
    setTimeout(() => {
      setIsHandlingWheel(false);
    }, 200);
    } else if (deltaY <0 && section > 0) {                 //go to next section
        setSection((section) => section - 1);
        setIsHandlingWheel(true);
    setTimeout(() => {
      setIsHandlingWheel(false);
    }, 200);
      
    } else if (section == end) {
      setSection((section) => section + 1);  // camera shake if end reached
      setTimeout(() => {
        setSection((section) => section - 1);
      }, 20);

    }

    
    console.log(section)
  };

  /*-----sections texts-----*/

  const hero0=`Des programmes adaptés à tes objectifs et capacités
  \n associés à une routine d’échauffement et d’étirement. 
  \nMon programme sera fait pour toi.`


  const hero1=`
  \n\n  ·Des programmes d'entraînement personnalisés, allant du renforcement et plans de remise en forme complets à la préparation d'athlète pour des échéances.
  \n  ·Un suivi mensuel comprenant des programmes personnalisés et adaptés chaque semaine, des retours sur la techniques quotidiens ainsi que des conseils nutritionnels pour l'optimisation de la performance. 
  \n  ·Des sessions de coaching individuelles pour des conseils et une correction de mouvements en présentiel.
  \n  ·Des cours en téléconférence sur la morpho-anatomie et la physiologie du corps par rapport à l'entraînement.
  `

  


  
  return (
    <div className='canvas-container'> 
      
      <Canvas onWheel={handleWheel}
      
    gl={{preserveDrawingBuffer: true}}
     shadows > 

      <perspectiveCamera />
      <CameraAnimation section={section} />
      
       <Suspense fallback={<CanvasLoader />}>
               
            <Gym    position={[2.5, 0, 0]} />
            <fog attach="fog" args={['#000000', 30, 50]}/>
            <Section position={[0, 2, -2]} rotation-y={Math.PI} text={'Tu recherches '} hero={hero0}/>
            <Section position={[5, 2, 0]} rotation-y={Math.PI / 2} text={'services'} hero={hero1} visible={section !== 0}/>
            <Section3 position={[0, 15,0]} visible={section !== 0} />         
            <Section4 position={[0, 0, 50]}/>
            
            
            
        </Suspense>
        
        <hemisphereLight intensity={1} groundColor="black" />

        <Preload all />
        
    </Canvas>
   
    </div>
      
  )
}

export default BackgroundScene
