<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    as?: string;
    from?: string;
    via?: string | null;
    to?: string;
    size?: number;
    mode?: string;
    className?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    as = "div",
    from = "rgba(255,255,255,0.8)",
    via = null,
    to = "transparent",
    size = 400,
    mode = "before",
    className = "",
    children,
    ...rest
  }: Props = $props();

  let card: HTMLElement | null = $state(null);

  // State to store mouse coordinates
  let m: { x: number | null; y: number | null } = $state({ x: null, y: null });

  // Update mouse position
  function handleMousemove(event: MouseEvent) {
    if (card) {
      const rect = card.getBoundingClientRect();
      m.x = event.clientX - rect.left;
      m.y = event.clientY - rect.top;
    }
  }

  const spotlightColorStops = [from, via, to]
    .filter((value) => !!value)
    .join(",");

  $effect(() => {
    window.addEventListener("mousemove", handleMousemove);
    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  });
</script>

<svelte:element
  this={as}
  bind:this={card}
  style="
      --x: {m.x}px; 
      --y: {m.y}px; 
      --spotlight-color-stops: {spotlightColorStops}; 
      --spotlight-size: {size}px;
    "
  class={`relative rounded-(--radius) transform-gpu overflow-hidden ${className} ${
    mode === "before"
      ? "before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
      : "after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
  }`}
  {...rest}
>
  {@render children()}
</svelte:element>
