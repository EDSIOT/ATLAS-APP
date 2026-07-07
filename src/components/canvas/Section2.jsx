import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';

import { useControls } from 'leva';
import { MeshTransmissionMaterial ,RoundedBox  } from '@react-three/drei';




  const Section2 = ({ ...props }) => {
  const materialProps = useControls({

        thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

        roughness: { value: 0.2, min: 0, max: 1, step: 0.1 },

        transmission: {value: 1, min: 0, max: 1, step: 0.1},

        ior: { value: 3, min: 0, max: 3, step: 0.1 },

        chromaticAberration: { value: 1, min: 0, max: 1},

        backside: { value: true},

    }) 

  const { width = 8, height = 3.7, depth = 0.02, radius = 0.05 } = props

  return (
    <>
    <RoundedBox
      {...props}
      args={[width, height, depth]}
      radius={radius}
      smoothness={4}
      position={[5, 3, 0]}
      rotation={[
          (0 * Math.PI) / 180, 
          (90 * Math.PI) / 180, 
          (0 * Math.PI) / 180]} 
    >
      <MeshTransmissionMaterial {...materialProps} />
    </RoundedBox>
    </>
  )
}

export default Section2
