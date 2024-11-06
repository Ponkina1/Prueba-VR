import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
document.body.appendChild( VRButton.createButton( renderer ) );

const controls = new OrbitControls( camera, renderer.domElement );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

const texture = new THREE.TextureLoader().load("Uvs.png");
const materiales = new THREE.MeshBasicMaterial( { map: texture } );

camera.position.z = 5;

var loader = new FBXLoader( );

loader.load( 'Nomo.fbx', function ( object ) 
{
    if ( object ) {

        object.traverse( function ( child ) 
        {

            if ( child.isMesh )
            {
                child.material = materiales
            }
        })
    }

    scene.add( object );
    object.scale.y = 0.01
    object.scale.z = 0.01
    object.scale.x = 0.01
}
)    

//////////////////////////////////////
function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}