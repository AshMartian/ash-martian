import {
  useEffect,
  useState,
} from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
    if (e.beta === null || e.gamma === null) return;

    // Convert beta (x) and gamma (y) to -1 to 1 range
    // Beta ranges from -180 to 180, we'll limit to ±45 degrees
    // Gamma ranges from -90 to 90, we'll limit to ±45 degrees
    const x = Math.max(-1, Math.min(1, e.gamma / 45));
    const y = Math.max(-1, Math.min(1, e.beta / 45));

    setMousePosition({ x, y });
  };

  useEffect(() => {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      // Request permission for iOS devices
      const DeviceOrientationEventiOS = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
      };
      if (typeof DeviceOrientationEventiOS.requestPermission === 'function') {
        DeviceOrientationEventiOS.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Non iOS 13+ devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    const updateMousePosition = (e: MouseEvent) => {
      // Convert to relative position from center of screen (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, []);

  return mousePosition;
}
