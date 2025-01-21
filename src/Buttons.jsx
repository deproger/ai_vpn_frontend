import React from "react";
import { useEffect } from "react";
import "./App.css";
export default function Buttons({ areButtonsLit }) {
  useEffect(() => {
    class Pixel {
      constructor(canvas, context, x, y, color, speed, delay) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep =
          Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
      }

      getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
      }

      draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;

        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
          this.x + centerOffset,
          this.y + centerOffset,
          this.size,
          this.size
        );
      }

      appear() {
        this.isIdle = false;

        if (this.counter <= this.delay) {
          this.counter += this.counterStep;
          return;
        }

        if (this.size >= this.maxSize) {
          this.isShimmer = true;
        }

        if (this.isShimmer) {
          this.shimmer();
        } else {
          this.size += this.sizeStep;
        }

        this.draw();
      }

      disappear() {
        this.isShimmer = false;
        this.counter = 0;

        if (this.size <= 0) {
          this.isIdle = true;
          return;
        } else {
          this.size -= 0.1;
        }

        this.draw();
      }

      shimmer() {
        if (this.size >= this.maxSize) {
          this.isReverse = true;
        } else if (this.size <= this.minSize) {
          this.isReverse = false;
        }

        if (this.isReverse) {
          this.size -= this.speed;
        } else {
          this.size += this.speed;
        }
      }
    }

    class PixelCanvas extends HTMLElement {
      static register(tag = "pixel-canvas") {
        if (!customElements.get(tag)) {
          customElements.define(tag, this);
        }
      }

      static css = `
            :host {
              display: grid;
              inline-size: 100%;
              block-size: 100%;
              overflow: hidden;
            }
          `;

      get colors() {
        return (
          this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"]
        );
      }

      get gap() {
        const value = this.dataset.gap || 5;
        const min = 4;
        const max = 50;

        if (value <= min) {
          return min;
        } else if (value >= max) {
          return max;
        } else {
          return parseInt(value);
        }
      }

      get speed() {
        const value = this.dataset.speed || 35;
        const min = 0;
        const max = 100;
        const throttle = 0.001;

        if (value <= min || this.reducedMotion) {
          return min;
        } else if (value >= max) {
          return max * throttle;
        } else {
          return parseInt(value) * throttle;
        }
      }

      get noFocus() {
        return this.hasAttribute("data-no-focus");
      }

      connectedCallback() {
        const canvas = document.createElement("canvas");
        const sheet = new CSSStyleSheet();

        this._parent = this.parentNode;
        this.shadowroot = this.attachShadow({ mode: "open" });

        sheet.replaceSync(PixelCanvas.css);

        this.shadowroot.adoptedStyleSheets = [sheet];
        this.shadowroot.append(canvas);
        this.canvas = this.shadowroot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.timeInterval = 1000 / 60;
        this.timePrevious = performance.now();
        this.reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        this.init();
        // this.resizeObserver = new ResizeObserver(() => this.init());
        this.resizeObserver = new ResizeObserver(() => {
          // Debounce mechanism to prevent thrashing
          clearTimeout(this.resizeTimeout);
          this.resizeTimeout = setTimeout(() => {
            this.init();
          }, 50); // Debounce delay
        });
        this.resizeObserver.observe(this);
        this.resizeObserver.observe(this);

        this._parent.addEventListener("mouseenter", this);
        this._parent.addEventListener("mouseleave", this);

        if (!this.noFocus) {
          this._parent.addEventListener("focusin", this);
          this._parent.addEventListener("focusout", this);
        }
      }

      disconnectedCallback() {
        this.resizeObserver.disconnect();
        this._parent.removeEventListener("mouseenter", this);
        this._parent.removeEventListener("mouseleave", this);

        if (!this.noFocus) {
          this._parent.removeEventListener("focusin", this);
          this._parent.removeEventListener("focusout", this);
        }

        delete this._parent;
      }

      handleEvent(event) {
        this[`on${event.type}`](event);
      }

      onmouseenter() {
        this.handleAnimation("appear");
      }

      onmouseleave() {
        this.handleAnimation("disappear");
      }

      onfocusin(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        this.handleAnimation("appear");
      }

      onfocusout(e) {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        this.handleAnimation("disappear");
      }

      handleAnimation(name) {
        cancelAnimationFrame(this.animation);
        this.animation = this.animate(name);
      }

      init() {
        const rect = this.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        this.pixels = [];
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.createPixels();
      }

      getDistanceToCanvasCenter(x, y) {
        const dx = x - this.canvas.width / 2;
        const dy = y - this.canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance;
      }

      createPixels() {
        for (let x = 0; x < this.canvas.width; x += this.gap) {
          for (let y = 0; y < this.canvas.height; y += this.gap) {
            const color =
              this.colors[Math.floor(Math.random() * this.colors.length)];
            const delay = this.reducedMotion
              ? 0
              : this.getDistanceToCanvasCenter(x, y);

            this.pixels.push(
              new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay)
            );
          }
        }
      }

      animate(fnName) {
        this.animation = requestAnimationFrame(() => this.animate(fnName));

        const timeNow = performance.now();
        const timePassed = timeNow - this.timePrevious;

        if (timePassed < this.timeInterval) return;

        this.timePrevious = timeNow - (timePassed % this.timeInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.pixels.length; i++) {
          this.pixels[i][fnName]();
        }

        if (this.pixels.every((pixel) => pixel.isIdle)) {
          cancelAnimationFrame(this.animation);
        }
      }
    }

    PixelCanvas.register();
  });
  return (
    <div className="w-[100vw] flex justify-center">
      <main>
        <div
          className={`card ${areButtonsLit ? "lit" : ""}`}
          style={{ "--active-color": "#e0f2fe" }}
        >
          <pixel-canvas
            data-gap="10"
            data-speed="25"
            data-colors="#e0f2fe, #7dd3fc, #0ea5e9"
          ></pixel-canvas>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentcolor"
            viewBox="0 0 256 256"
          >
            <path d="M67.84,92.61,25.37,128l42.47,35.39a6,6,0,1,1-7.68,9.22l-48-40a6,6,0,0,1,0-9.22l48-40a6,6,0,0,1,7.68,9.22Zm176,30.78-48-40a6,6,0,1,0-7.68,9.22L230.63,128l-42.47,35.39a6,6,0,1,0,7.68,9.22l48-40a6,6,0,0,0,0-9.22Zm-81.79-89A6,6,0,0,0,154.36,38l-64,176A6,6,0,0,0,94,221.64a6.15,6.15,0,0,0,2,.36,6,6,0,0,0,5.64-3.95l64-176A6,6,0,0,0,162.05,34.36Z"></path>
          </svg>
          <button>Code</button>
        </div>

        <div
          className={`card ${areButtonsLit ? "lit" : ""}`}
          style={{ "--active-color": "#e0f2fe" }}
        >
          <pixel-canvas
            data-gap="3"
            data-speed="20"
            data-colors="#fef08a, #fde047, #eab308"
          ></pixel-canvas>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentcolor"
            viewBox="0 0 256 256"
          >
            <path d="M180,146H158V110h22a34,34,0,1,0-34-34V98H110V76a34,34,0,1,0-34,34H98v36H76a34,34,0,1,0,34,34V158h36v22a34,34,0,1,0,34-34ZM158,76a22,22,0,1,1,22,22H158ZM54,76a22,22,0,0,1,44,0V98H76A22,22,0,0,1,54,76ZM98,180a22,22,0,1,1-22-22H98Zm12-70h36v36H110Zm70,92a22,22,0,0,1-22-22V158h22a22,22,0,0,1,0,44Z"></path>
          </svg>
          <button>Command</button>
        </div>

                <div
          className={`card ${areButtonsLit ? "lit" : ""}`}
          style={{ "--active-color": "#e0f2fe" }}
        >
          <pixel-canvas
            data-gap="6"
            data-speed="80"
            data-colors="#fecdd3, #fda4af, #e11d48"
            data-no-focus
          ></pixel-canvas>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentcolor"
            viewBox="0 0 256 256"
          >
            <path d="M222,67.34a33.81,33.81,0,0,0-10.64-24.25C198.12,30.56,176.68,31,163.54,44.18L142.82,65l-.63-.63a22,22,0,0,0-31.11,0l-9,9a14,14,0,0,0,0,19.81l3.47,3.47L53.14,149.1a37.81,37.81,0,0,0-9.84,36.73l-8.31,19a11.68,11.68,0,0,0,2.46,13A13.91,13.91,0,0,0,47.32,222,14.15,14.15,0,0,0,53,220.82L71,212.92a37.92,37.92,0,0,0,35.84-10.07l52.44-52.46,3.47,3.48a14,14,0,0,0,19.8,0l9-9a22.06,22.06,0,0,0,0-31.13l-.66-.65L212,91.85A33.76,33.76,0,0,0,222,67.34Zm-123.61,127a26,26,0,0,1-26,6.47,6,6,0,0,0-4.17.24l-20,8.75a2,2,0,0,1-2.09-.31l9.12-20.9a5.94,5.94,0,0,0,.19-4.31A25.91,25.91,0,0,1,56,166h70.78ZM138.78,154H65.24l48.83-48.84,36.76,36.78Zm64.77-70.59L178.17,108.9a6,6,0,0,0,0,8.47l4.88,4.89a10,10,0,0,1,0,14.15l-9,9a2,2,0,0,1-2.82,0l-60.69-60.7a2,2,0,0,1,0-2.83l9-9a10,10,0,0,1,14.14,0l4.89,4.89a6,6,0,0,0,4.24,1.75h0a6,6,0,0,0,4.25-1.77L172,52.66c8.57-8.58,22.51-9,31.07-.85a22,22,0,0,1,.44,31.57Z"></path>
          </svg>
          <button>Dropper</button>
        </div>
      </main>
    </div>
  );
}