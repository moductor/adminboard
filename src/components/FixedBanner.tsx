"use client";

import { getChildrenRecursive } from "@/utils/getChildrenRecursive";
import { ReactNode, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

const fixedClass = tv({
  base: "fixed inset-x-0 top-0 border-b-2 border-white border-opacity-10 bg-white bg-opacity-10 py-4 shadow-md backdrop-blur-[6px] transition-all",
  variants: {
    visibility: {
      visible: "",
      hidden: "pointer-events-none translate-y-[-2rem] opacity-0",
    },
  },
  defaultVariants: {
    visibility: "hidden",
  },
});

type Props = JSX.IntrinsicElements["div"] & {
  resolvePosition?: boolean;
  children?: ReactNode;
};

export default function FixedBanner({
  resolvePosition = true,
  className,
  children,
  ...props
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const fixedBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current!;
    const fixedBanner = fixedBannerRef.current!;

    getChildrenRecursive(fixedBanner).forEach((element) => {
      element.tabIndex = -1;
    });

    function updateFixedBannerPosition() {
      const wrapper = fixedBanner.parentElement!;
      const currentX = parseInt(wrapper.style.left) || 0;
      const x = banner.offsetLeft - (wrapper.offsetLeft - currentX);
      wrapper.style.left = `${x}px`;
    }

    if (resolvePosition) {
      window.addEventListener("resize", updateFixedBannerPosition);
      updateFixedBannerPosition();
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
    });
    observer.observe(banner);

    return () => {
      window.removeEventListener("resize", updateFixedBannerPosition);
      observer.unobserve(banner);
    };
  }, []);

  return (
    <>
      <div ref={bannerRef} className={className} {...props}>
        {children}
      </div>

      <div
        className={fixedClass({ visibility: isVisible ? "visible" : "hidden" })}
        data-visible={isVisible}
        aria-hidden="true"
      >
        <div className="relative">
          <div ref={fixedBannerRef} className={className} {...props}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
