if (!window.THREE) {
    console.error("❌ THREE.js is not loaded.");
}

// ✅ Define Three.js variables only once, globally
window.THREE_GLOBALS = {
    // Core Utilities
    EventDispatcher: THREE.EventDispatcher,
    MathUtils: THREE.MathUtils,

    // Input Controls
    MOUSE: THREE.MOUSE,
    TOUCH: THREE.TOUCH,

    // Vectors, Quaternions, and Matrices
    Vector2: THREE.Vector2,
    Vector3: THREE.Vector3,
    Vector4: THREE.Vector4,
    Quaternion: THREE.Quaternion,
    Matrix4: THREE.Matrix4,

    // Geometry & Buffers
    BufferAttribute: THREE.BufferAttribute,
    BufferGeometry: THREE.BufferGeometry,
    Float32BufferAttribute: THREE.Float32BufferAttribute,
    InstancedBufferAttribute: THREE.InstancedBufferAttribute,
    InterleavedBuffer: THREE.InterleavedBuffer,
    InterleavedBufferAttribute: THREE.InterleavedBufferAttribute,

    // Drawing Modes
    TriangleFanDrawMode: THREE.TriangleFanDrawMode,
    TriangleStripDrawMode: THREE.TriangleStripDrawMode,
    TrianglesDrawMode: THREE.TrianglesDrawMode,

    // Materials & Shaders
    ShaderMaterial: THREE.ShaderMaterial,
    UniformsUtils: THREE.UniformsUtils,
    MeshBasicMaterial: THREE.MeshBasicMaterial,
    MeshPhysicalMaterial: THREE.MeshPhysicalMaterial,
    MeshStandardMaterial: THREE.MeshStandardMaterial,

    // Meshes & Objects
    Mesh: THREE.Mesh,
    SkinnedMesh: THREE.SkinnedMesh,
    Object3D: THREE.Object3D,
    Group: THREE.Group,

    // Cameras
    PerspectiveCamera: THREE.PerspectiveCamera,
    OrthographicCamera: THREE.OrthographicCamera,

    // Lights
    DirectionalLight: THREE.DirectionalLight,
    PointLight: THREE.PointLight,
    SpotLight: THREE.SpotLight,

    // Colors & Textures
    Color: THREE.Color,
    Texture: THREE.Texture,
    TextureLoader: THREE.TextureLoader,
    ColorManagement: THREE.ColorManagement,

    // Render Targets
    WebGLRenderTarget: THREE.WebGLRenderTarget,
    HalfFloatType: THREE.HalfFloatType,

    // Animation & Skeletons
    AnimationClip: THREE.AnimationClip,
    QuaternionKeyframeTrack: THREE.QuaternionKeyframeTrack,
    Skeleton: THREE.Skeleton,

    // Loaders & File Handling
    Loader: THREE.Loader,
    LoaderUtils: THREE.LoaderUtils,
    FileLoader: THREE.FileLoader,
    ImageBitmapLoader: THREE.ImageBitmapLoader,
		GLTFLoader: THREE.GLTFLoader,  // ✅ Ensure GLTFLoader is defined globally
		LoadingManager: THREE.LoadingManager,

    // Controls
    OrbitControls: THREE.OrbitControls, // ✅ Ensure OrbitControls is defined globally

  

    // Special Components
    Plane: THREE.Plane,
    Ray: THREE.Ray,
    Spherical: THREE.Spherical,
    RepeatWrapping: THREE.RepeatWrapping,
    SRGBColorSpace: THREE.SRGBColorSpace,
		
		// ✅ Added Missing Texture Wrappings
    ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
    MirroredRepeatWrapping: THREE.MirroredRepeatWrapping,
    RepeatWrapping: THREE.RepeatWrapping,
		
		// ✅ Added Missing Filters
    NearestFilter: THREE.NearestFilter,
    LinearFilter: THREE.LinearFilter,
    NearestMipmapNearestFilter: THREE.NearestMipmapNearestFilter,
    LinearMipmapNearestFilter: THREE.LinearMipmapNearestFilter,
    NearestMipmapLinearFilter: THREE.NearestMipmapLinearFilter,
    LinearMipmapLinearFilter: THREE.LinearMipmapLinearFilter,

		// ✅ Added Interpolant
    Interpolant: THREE.Interpolant,
		
// ✅ Added Interpolation Types
    InterpolateLinear: THREE.InterpolateLinear,
    InterpolateDiscrete: THREE.InterpolateDiscrete
};