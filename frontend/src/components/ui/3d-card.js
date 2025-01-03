import React, { createContext, useState, useContext, useRef } from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const MouseEnterContext = createContext({
  isMouseEntered: false,
});

export const CardContainer = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rotationY = ((mouseX - width / 2) / width) * 12; // Reduced rotation for subtler effect
    const rotationX = ((mouseY - height / 2) / height) * -12;

    setRotationX(rotationX);
    setRotationY(rotationY);
  };

  return (
    <MouseEnterContext.Provider value={{ isMouseEntered }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => {
          setIsMouseEntered(false);
          setRotationX(0);
          setRotationY(0);
        }}
        className={cn("flex items-center justify-center", containerClassName)}
      >
        <div
          style={{
            transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
            transition: isMouseEntered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          }}
          className={className}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative transition-transform duration-200 ease-out",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  children,
  className,
  translateZ = 0,
  as: Component = "div",
  ...rest
}) => {
  const { isMouseEntered } = useContext(MouseEnterContext);
  
  return (
    <Component
      className={cn("transition-transform duration-200 ease-out", className)}
      style={{
        transform: isMouseEntered ? `translateZ(${translateZ}px)` : undefined,
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};