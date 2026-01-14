import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import './Plasma.css';

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: 'forward' | 'reverse' | 'pingpong';
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  fullscreen?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 25.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  // Boost the intensity (reduced for milder look)
  rgb = rgb * 4.0;
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  
  // Apply custom color with intensity mapping
  vec3 finalColor = mix(rgb, uCustomColor * intensity * 1.5, step(0.5, uUseCustomColor));
  
  // Ensure proper brightness
  finalColor = clamp(finalColor, 0.0, 1.0);
  
  // Apply opacity control
  float alpha = clamp(length(rgb) * uOpacity, 0.0, 1.0);
  
  fragColor = vec4(finalColor, alpha);
}`;

export const Plasma: React.FC<PlasmaProps> = ({
  color = '#9c5af2',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 0.15,
  mouseInteractive = true,
  fullscreen = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    // Create renderer
    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1)
    });
    rendererRef.current = renderer;
    
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vertex,
      fragment: fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteractive || !container) return;
      
      const rect = container.getBoundingClientRect();
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = e.clientX - rect.left;
      mouseUniform[1] = e.clientY - rect.top;
    };

    // Add mouse listener to container, not window for better scoping
    if (mouseInteractive) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Resize handler
    const setSize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    
    // Force initial size
    setSize();

    // Animation loop
    const t0 = performance.now();
    let lastFrameTime = 0;
    const targetFPS = 30; 
    const frameInterval = 1000 / targetFPS;

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop);

      // Throttling: Only render if enough time has passed
      const elapsed = t - lastFrameTime;
      if (elapsed < frameInterval) {
        return;
      }
      lastFrameTime = t - (elapsed % frameInterval);

      let timeValue = (t - t0) * 0.001;
      
      if (direction === 'pingpong') {
        const pingpongDuration = 10;
        const segmentTime = timeValue % pingpongDuration;
        const isForward = Math.floor(timeValue / pingpongDuration) % 2 === 0;
        const u = segmentTime / pingpongDuration;
        const smooth = u * u * (3 - 2 * u);
        const pingpongTime = isForward ? smooth * pingpongDuration : (1 - smooth) * pingpongDuration;
        
        (program.uniforms.uDirection as any).value = 1.0;
        (program.uniforms.iTime as any).value = pingpongTime;
      } else {
        (program.uniforms.iTime as any).value = timeValue;
      }
      
      renderer.render({ scene: mesh });
    };
    
    rafRef.current = requestAnimationFrame(loop);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      ro.disconnect();
      
      if (mouseInteractive && container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      
      try {
        if (container && container.contains(canvas)) {
          container.removeChild(canvas);
        }
      } catch (e) {
        console.warn('Error removing canvas:', e);
      }
      
      rendererRef.current = null;
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return (
    <div 
      ref={containerRef} 
      className={fullscreen ? "plasma-container plasma-fullscreen" : "plasma-container"}
    />
  );
};

export default Plasma;
