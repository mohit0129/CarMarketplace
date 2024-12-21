'use client'

import React, { useRef, useEffect, useState } from 'react'
// import * as THREE from 'three'

export default function Component() {
  // const canvasRef = useRef(null)
  // const [showReturn, setShowReturn] = useState(false)

  // useEffect(() => {
    // if (!canvasRef.current) return

    // const scene = new THREE.Scene()
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true })
    // renderer.setSize(window.innerWidth, window.innerHeight)
    // renderer.shadowMap.enabled = true
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Sky
  //   const skyGeometry = new THREE.SphereGeometry(500, 32, 32)
  //   const skyMaterial = new THREE.ShaderMaterial({
  //     uniforms: {
  //       topColor: { value: new THREE.Color(0x0077ff) },
  //       bottomColor: { value: new THREE.Color(0xffffff) },
  //       offset: { value: 33 },
  //       exponent: { value: 0.6 }
  //     },
  //     vertexShader: `
  //       varying vec3 vWorldPosition;
  //       void main() {
  //         vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  //         vWorldPosition = worldPosition.xyz;
  //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  //       }
  //     `,
  //     fragmentShader: `
  //       uniform vec3 topColor;
  //       uniform vec3 bottomColor;
  //       uniform float offset;
  //       uniform float exponent;
  //       varying vec3 vWorldPosition;
  //       void main() {
  //         float h = normalize(vWorldPosition + offset).y;
  //         gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
  //       }
  //     `,
  //     side: THREE.BackSide
  //   })
  //   const sky = new THREE.Mesh(skyGeometry, skyMaterial)
  //   scene.add(sky)

  //   // Car model
  //   const carGroup = new THREE.Group()

  //   // Car body
  //   const bodyGeometry = new THREE.BoxGeometry(1.8, 0.6, 4)
  //   const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff })
  //   const carBody = new THREE.Mesh(bodyGeometry, bodyMaterial)
  //   carBody.position.y = 0.6
  //   carBody.castShadow = true
  //   carGroup.add(carBody)

  //   // Car roof
  //   const roofGeometry = new THREE.BoxGeometry(1.5, 0.5, 2)
  //   const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x1e90ff })
  //   const carRoof = new THREE.Mesh(roofGeometry, roofMaterial)
  //   carRoof.position.y = 1.15
  //   carRoof.position.z = -0.5
  //   carRoof.castShadow = true
  //   carGroup.add(carRoof)

  //   // Wheels
  //   const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32)
  //   const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
  //   const wheelPositions = [
  //     { x: -0.9, y: 0.4, z: 1.2 },
  //     { x: 0.9, y: 0.4, z: 1.2 },
  //     { x: -0.9, y: 0.4, z: -1.2 },
  //     { x: 0.9, y: 0.4, z: -1.2 }
  //   ]
  //   wheelPositions.forEach(position => {
  //     const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial)
  //     wheel.rotation.z = Math.PI / 2
  //     wheel.position.set(position.x, position.y, position.z)
  //     wheel.castShadow = true
  //     carGroup.add(wheel)
  //   })

  //   // Headlights
  //   const headlightGeometry = new THREE.CircleGeometry(0.15, 32)
  //   const headlightMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 })
  //   const headlightPositions = [
  //     { x: -0.7, y: 0.7, z: 2 },
  //     { x: 0.7, y: 0.7, z: 2 }
  //   ]
  //   headlightPositions.forEach(position => {
  //     const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial)
  //     headlight.position.set(position.x, position.y, position.z)
  //     carGroup.add(headlight)
  //   })

  //   scene.add(carGroup)

  //   // Ground
  //   const groundGeometry = new THREE.PlaneGeometry(2000, 2000)
  //   const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x1abc9c })
  //   const ground = new THREE.Mesh(groundGeometry, groundMaterial)
  //   ground.rotation.x = -Math.PI / 2
  //   ground.receiveShadow = true
  //   scene.add(ground)

  //   // Road
  //   const roadGeometry = new THREE.PlaneGeometry(10, 2000)
  //   const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
  //   const road = new THREE.Mesh(roadGeometry, roadMaterial)
  //   road.rotation.x = -Math.PI / 2
  //   road.position.y = 0.01
  //   road.receiveShadow = true
  //   scene.add(road)

  //   // Road markings
  //   const markingGeometry = new THREE.PlaneGeometry(0.2, 3)
  //   const markingMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
  //   for (let i = -1000; i < 1000; i += 20) {
  //     const marking = new THREE.Mesh(markingGeometry, markingMaterial)
  //     marking.rotation.x = -Math.PI / 2
  //     marking.position.set(0, 0.02, i)
  //     scene.add(marking)
  //   }

  //   // Trees
  //   const treeGeometry = new THREE.ConeGeometry(2, 5, 8)
  //   const treeMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 })
  //   const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2)
  //   const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })

  //   for (let i = 0; i < 500; i++) {
  //     const treeGroup = new THREE.Group()
  //     const treeCone = new THREE.Mesh(treeGeometry, treeMaterial)
  //     const treeTrunk = new THREE.Mesh(trunkGeometry, trunkMaterial)

  //     treeCone.position.y = 3.5
  //     treeTrunk.position.y = 1

  //     treeGroup.add(treeCone)
  //     treeGroup.add(treeTrunk)

  //     treeGroup.position.x = Math.random() * 1000 - 500
  //     treeGroup.position.z = Math.random() * 2000 - 1000

  //     if (Math.abs(treeGroup.position.x) > 10 || Math.abs(treeGroup.position.z) > 1000) {
  //       treeGroup.castShadow = true
  //       scene.add(treeGroup)
  //     }
  //   }

  //   // 404 Sign
  //   const canvas = document.createElement('canvas');
  //   canvas.width = 256;
  //   canvas.height = 128;
  //   const context = canvas.getContext('2d');
  //   context.fillStyle = '#ffffff';
  //   context.font = 'Bold 80px Arial';
  //   context.fillText('404', 70, 90);

  //   const texture = new THREE.CanvasTexture(canvas);
  //   const signMaterial = new THREE.MeshPhongMaterial({ map: texture, color: 0xff0000 });
  //   const signGeometry = new THREE.PlaneGeometry(10, 5)
  //   const sign = new THREE.Mesh(signGeometry, signMaterial)
  //   sign.position.set(0, 2.5, -1000)
  //   scene.add(sign)

  //   // Lighting
  //   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  //   scene.add(ambientLight)

  //   const sunLight = new THREE.DirectionalLight(0xffffff, 0.8)
  //   sunLight.position.set(50, 100, 50)
  //   sunLight.castShadow = true
  //   sunLight.shadow.mapSize.width = 2048
  //   sunLight.shadow.mapSize.height = 2048
  //   sunLight.shadow.camera.near = 1
  //   sunLight.shadow.camera.far = 500
  //   scene.add(sunLight)

  //   camera.position.set(0, 5, 10)
  //   camera.lookAt(carGroup.position)

  //   let carSpeed = 0
  //   let steering = 0
  //   const maxSpeed = 2.0
  //   const acceleration = 0.05
  //   const deceleration = 0.02
  //   const maxSteering = 0.03
  //   let cameraOffset = new THREE.Vector3(0, 5, 10)

  //   const keysPressed = {
  //     ArrowUp: false,
  //     ArrowDown: false,
  //     ArrowLeft: false,
  //     ArrowRight: false
  //   }

  //   const animate = () => {
  //     requestAnimationFrame(animate)

  //     // Update car physics
  //     if (keysPressed.ArrowUp) {
  //       carSpeed = Math.min(carSpeed + acceleration, maxSpeed)
  //     } else if (keysPressed.ArrowDown) {
  //       carSpeed = Math.max(carSpeed - acceleration, -maxSpeed / 2)
  //     } else {
  //       carSpeed *= 0.95 // Apply friction when no key is pressed
  //     }

  //     if (keysPressed.ArrowLeft) {
  //       steering = Math.max(steering - 0.001, -maxSteering)
  //     } else if (keysPressed.ArrowRight) {
  //       steering = Math.min(steering + 0.001, maxSteering)
  //     } else {
  //       steering *= 0.8 // Gradually return steering to center
  //     }

  //     const direction = new THREE.Vector3(
  //       Math.sin(carGroup.rotation.y),
  //       0,
  //       Math.cos(carGroup.rotation.y)
  //     )

  //     carGroup.position.add(direction.multiplyScalar(carSpeed))
  //     carGroup.rotation.y += steering * carSpeed

  //     // Terrain effect
  //     const terrainFriction = Math.abs(carGroup.position.x) > 5 ? 0.95 : 1
  //     carSpeed *= terrainFriction

  //     // Update camera position smoothly
  //     const idealOffset = new THREE.Vector3(0, 3, 8)
  //     idealOffset.applyQuaternion(carGroup.quaternion)
  //     idealOffset.add(carGroup.position)
  //     cameraOffset.lerp(idealOffset, 0.1)
  //     camera.position.copy(cameraOffset)
  //     camera.lookAt(carGroup.position)

  //     // Move 404 sign towards the car
  //     sign.position.z += carSpeed

  //     // Rotate wheels
  //     carGroup.children.forEach(child => {
  //       if (child.geometry instanceof THREE.CylinderGeometry) {
  //         child.rotation.x += carSpeed * 2
  //       }
  //     })

  //     renderer.render(scene, camera)
  //   }

  //   animate()

  //   const handleKeyDown = (event) => {
  //     if (event.key in keysPressed) {
  //       keysPressed[event.key] = true
  //     }
  //   }

  //   const handleKeyUp = (event) => {
  //     if (event.key in keysPressed) {
  //       keysPressed[event.key] = false
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)
  //   window.addEventListener('keyup', handleKeyUp)

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //     window.removeEventListener('keyup', handleKeyUp)
  //   }
  // }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '4em', marginBottom: '0px' }}>404</h1>
        <p style={{ fontSize: '1.5em', marginBottom: '5px' }}>Sorry, The page you are looking doesn't exist.</p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '20px', padding: '10px 20px', fontSize: '1em', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
          Return to Home
        </button>
      </div>
    </div>
  )
} 