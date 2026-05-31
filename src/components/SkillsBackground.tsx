"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

interface WireframeShape {
  type: "hexagon" | "cube" | "concentric";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
}

export function SkillsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Camera and Interactive state
    let width = container.clientWidth;
    let height = container.clientHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetCamX = 0;
    let targetCamY = 0;
    let currentCamX = 0;
    let currentCamY = 0;

    // Time tracker
    let time = 0;

    // Create background radial blobs
    const blobs = [
      { x: width * 0.25, y: height * 0.3, radius: 250, targetRadius: 250, angle: 0, speed: 0.0005, color: "rgba(224, 242, 254, 0.45)" }, // soft blue
      { x: width * 0.75, y: height * 0.6, radius: 300, targetRadius: 300, angle: Math.PI, speed: 0.0004, color: "rgba(241, 245, 249, 0.6)" }, // soft silver/gray
      { x: width * 0.5, y: height * 0.25, radius: 200, targetRadius: 200, angle: Math.PI / 2, speed: 0.0006, color: "rgba(239, 246, 255, 0.35)" } // accent blue
    ];

    // Initialize Network Nodes
    const nodes: Node[] = [];
    const numNodes = 22;
    const colors = [
      "rgba(100, 116, 139, 0.22)", // Slate
      "rgba(0, 102, 255, 0.16)",    // Soft Blue
      "rgba(148, 163, 184, 0.25)", // Silver-gray
    ];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 2 + 1.5,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Initialize Floating Particles
    const particles: Particle[] = [];
    const numParticles = 35;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.2 + 0.1),
        speedX: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.4 ? "rgba(96, 165, 250, 0.3)" : "rgba(200, 200, 200, 0.4)"
      });
    }

    // Initialize Floating Wireframe Shapes
    const shapes: WireframeShape[] = [
      {
        type: "hexagon",
        x: width * 0.15,
        y: height * 0.25,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        size: 38,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.001,
        rotSpeedY: 0.002,
        rotSpeedZ: 0.003
      },
      {
        type: "cube",
        x: width * 0.85,
        y: height * 0.35,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        size: 32,
        rotX: Math.random(),
        rotY: Math.random(),
        rotZ: Math.random(),
        rotSpeedX: 0.002,
        rotSpeedY: 0.003,
        rotSpeedZ: 0.001
      },
      {
        type: "concentric",
        x: width * 0.72,
        y: height * 0.78,
        vx: (Math.random() - 0.5) * 0.07,
        vy: (Math.random() - 0.5) * 0.07,
        size: 44,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        rotSpeedX: 0,
        rotSpeedY: 0,
        rotSpeedZ: 0.004
      }
    ];

    // Resize handler (retina display scaling)
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      // Re-adjust out-of-bound nodes/shapes gently
      nodes.forEach(n => {
        if (n.x > width) n.x = Math.random() * width;
        if (n.y > height) n.y = Math.random() * height;
      });
      shapes.forEach(s => {
        if (s.x > width) s.x = Math.random() * width;
        if (s.y > height) s.y = Math.random() * height;
      });
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse interactive movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      mouseX = relativeX;
      mouseY = relativeY;

      // Parallax translation amounts (slow, cinematic drift)
      targetCamX = ((relativeX / width) - 0.5) * -22;
      targetCamY = ((relativeY / height) - 0.5) * -22;
    };

    const handleMouseLeave = () => {
      targetCamX = 0;
      targetCamY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Intersection Observer to stop animation when section is out of viewport (performance preservation)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.02 });

    observer.observe(container);

    // Helper: 3D projection for wireframe cube
    const drawCube = (ctx: CanvasRenderingContext2D, s: WireframeShape) => {
      const size = s.size;
      const vertices = [
        [-size, -size, -size],
        [size, -size, -size],
        [size, size, -size],
        [-size, size, -size],
        [-size, -size, size],
        [size, -size, size],
        [size, size, size],
        [-size, size, size]
      ];

      // Rotation matrix values
      const radX = s.rotX;
      const radY = s.rotY;
      const radZ = s.rotZ;

      const cosX = Math.cos(radX), sinX = Math.sin(radX);
      const cosY = Math.cos(radY), sinY = Math.sin(radY);
      const cosZ = Math.cos(radZ), sinZ = Math.sin(radZ);

      // Rotate and Project vertices
      const projected = vertices.map(v => {
        // Rotate X
        let y1 = v[1] * cosX - v[2] * sinX;
        let z1 = v[1] * sinX + v[2] * cosX;

        // Rotate Y
        let x2 = v[0] * cosY + z1 * sinY;
        let z2 = -v[0] * sinY + z1 * cosY;

        // Rotate Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = x2 * sinZ + y1 * cosZ;

        // Apply perspective division
        const distance = 160;
        const scale = distance / (distance + z2);
        
        return {
          x: s.x + x3 * scale,
          y: s.y + y3 * scale
        };
      });

      // Draw Edges
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Back face
        [4, 5], [5, 6], [6, 7], [7, 4], // Front face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
      ];

      ctx.beginPath();
      edges.forEach(([p1, p2]) => {
        ctx.moveTo(projected[p1].x, projected[p1].y);
        ctx.lineTo(projected[p2].x, projected[p2].y);
      });
      ctx.strokeStyle = "rgba(0, 102, 255, 0.05)";
      ctx.lineWidth = 1.0;
      ctx.stroke();
    };

    // Helper: Draw elegant wireframe hexagon
    const drawHexagon = (ctx: CanvasRenderingContext2D, s: WireframeShape) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotZ);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = Math.cos(angle) * s.size;
        const y = Math.sin(angle) * s.size;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(100, 116, 139, 0.06)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Subtle diagonal wireframe connections inside
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const a1 = (i * Math.PI) / 3;
        const a2 = a1 + Math.PI;
        ctx.moveTo(Math.cos(a1) * s.size, Math.sin(a1) * s.size);
        ctx.lineTo(Math.cos(a2) * s.size, Math.sin(a2) * s.size);
      }
      ctx.strokeStyle = "rgba(0, 102, 255, 0.02)";
      ctx.stroke();
      
      ctx.restore();
    };

    // Helper: Draw concentric tech circles
    const drawConcentric = (ctx: CanvasRenderingContext2D, s: WireframeShape) => {
      ctx.save();
      ctx.translate(s.x, s.y);

      // Outer dashed circle
      ctx.beginPath();
      ctx.arc(0, 0, s.size, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1.0;
      ctx.setLineDash([6, 8]);
      ctx.rotate(s.rotZ);
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner solid circle
      ctx.beginPath();
      const innerRadius = s.size * 0.6 + Math.sin(time * 0.02) * 2;
      ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 102, 255, 0.04)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center glowing dot
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 102, 255, 0.15)";
      ctx.fill();

      ctx.restore();
    };

    // The Main 60FPS Draw Loop
    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += 1;

      // Clear with elegant off-white radial backdrop base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Interpolate cinematic camera drift (smooth lag)
      currentCamX += (targetCamX - currentCamX) * 0.06;
      currentCamY += (targetCamY - currentCamY) * 0.06;

      ctx.save();
      // Apply subtle camera shift
      ctx.translate(currentCamX, currentCamY);

      // 1. Draw large floating gradient background blobs (blurs)
      blobs.forEach(b => {
        b.angle += b.speed;
        const driftX = Math.sin(b.angle) * 35;
        const driftY = Math.cos(b.angle) * 25;
        
        const grad = ctx.createRadialGradient(
          b.x + driftX, b.y + driftY, 5,
          b.x + driftX, b.y + driftY, b.radius
        );
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x + driftX, b.y + driftY, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw modern technical fine grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.009)";
      ctx.lineWidth = 0.8;
      const gridSize = 72;
      // Start slightly beyond screen edges to handle camera parallax shifts
      const startX = -gridSize * 2;
      const endX = width + gridSize * 2;
      const startY = -gridSize * 2;
      const endY = height + gridSize * 2;

      ctx.beginPath();
      for (let x = startX; x < endX; x += gridSize) {
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
      }
      for (let y = startY; y < endY; y += gridSize) {
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
      }
      ctx.stroke();

      // 3. Draw and update Floating Particles (light dust)
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if floated past the top
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 4. Draw Floating Wireframe Shapes
      shapes.forEach(s => {
        // Slow movement
        s.x += s.vx;
        s.y += s.vy;

        // Slowly increment rotation angles
        s.rotX += s.rotSpeedX;
        s.rotY += s.rotSpeedY;
        s.rotZ += s.rotSpeedZ;

        // Wrap around margins
        const pad = s.size * 2;
        if (s.x < -pad) s.x = width + pad;
        if (s.x > width + pad) s.x = -pad;
        if (s.y < -pad) s.y = height + pad;
        if (s.y > height + pad) s.y = -pad;

        if (s.type === "hexagon") drawHexagon(ctx, s);
        else if (s.type === "cube") drawCube(ctx, s);
        else if (s.type === "concentric") drawConcentric(ctx, s);
      });

      // 5. Draw Network Mesh Connections
      nodes.forEach((n, i) => {
        // Drifting motion
        n.x += n.vx;
        n.y += n.vy;

        // Wall boundary bounce
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 170;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = `rgba(0, 102, 255, ${alpha * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        // Draw node dot
        const pulse = Math.sin(time * n.pulseSpeed + n.pulsePhase) * 0.4 + 1.0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      // 6. Draw Elegant Digital Waves at the bottom
      const drawWave = (waveIndex: number, speed: number, heightMult: number, opacity: number, color: string) => {
        ctx.beginPath();
        const baseLine = height - 50 - waveIndex * 14;
        const freq = 0.0035 + waveIndex * 0.001;
        const amp = 15 + waveIndex * 8;
        const offset = time * speed;

        ctx.moveTo(0, height);
        ctx.lineTo(0, baseLine);

        for (let x = 0; x <= width; x += 10) {
          const y = baseLine + Math.sin(x * freq + offset) * amp * heightMult;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      };

      // Multi-layered waves
      drawWave(2, 0.006, 0.7, 0.03, "rgba(0, 102, 255, 0.10)");
      drawWave(1, 0.008, 0.9, 0.04, "rgba(226, 232, 240, 0.55)");
      drawWave(0, 0.011, 1.0, 0.05, "rgba(96, 165, 250, 0.12)");

      ctx.restore();

      animationFrameId = requestAnimationFrame(draw);
    };

    // Kick off animation loop
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "auto", // Allow mousemove tracking inside the container
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none", // Prevent blocking interactions with skill cards on top
        }}
      />
    </div>
  );
}
