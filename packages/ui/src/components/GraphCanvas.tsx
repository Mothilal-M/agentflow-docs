import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { GraphEngine, GraphNode, GraphOptions } from '../canvas/graph-engine';

export interface GraphCanvasProps extends GraphOptions {
  className?: string;
  style?: React.CSSProperties;
}

export interface GraphCanvasRef {
  pulseStorm: (count?: number) => void;
  getEngine: () => GraphEngine | null;
}

export const GraphCanvas = forwardRef<GraphCanvasRef, GraphCanvasProps>(
  (
    {
      nodeCount = 20,
      maxDistance = 160,
      interactive = true,
      theme = 'dark',
      onNodeHover,
      onNodeClick,
      className = '',
      style,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const engineRef = useRef<GraphEngine | null>(null);

    useImperativeHandle(ref, () => ({
      pulseStorm: (count = 12) => {
        engineRef.current?.spawnPackets(count);
      },
      getEngine: () => engineRef.current,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const engine = new GraphEngine(canvas, {
        nodeCount,
        maxDistance,
        interactive,
        theme,
        onNodeHover,
        onNodeClick,
      });

      engine.init();
      engineRef.current = engine;

      return () => {
        engine.destroy();
      };
    }, [nodeCount, maxDistance, interactive, theme]);

    return (
      <canvas
        ref={canvasRef}
        className={`w-full h-full block ${className}`}
        style={style}
      />
    );
  }
);

GraphCanvas.displayName = 'GraphCanvas';
