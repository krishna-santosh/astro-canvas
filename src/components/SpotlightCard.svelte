<script lang="ts">
  import type { Snippet } from "svelte";
  import BaseSpotlightCard from "./BaseSpotlightCard.svelte";

  interface Props {
    as?: string;
    from?: string;
    via?: string | null;
    to?: string;
    size?: number;
    mode?: string;
    white?: boolean;
    radius?: string;
    className?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  // Define props with default values
  let {
    as = "div",
    from = "rgba(255,255,255,0.8)",
    via = null,
    to = "transparent",
    size = 250,
    mode = "before",
    white = false,
    radius = "2xl",
    className = "",
    children,
    ...rest
  }: Props = $props();

  let card: HTMLElement | null = $state(null);

  // State to hold mouse coordinates
  let m: { x: number | null; y: number | null } = $state({ x: null, y: null });

  // Mouse move handler
  function handleMousemove(event: MouseEvent) {
    if (card) {
      const rect = card.getBoundingClientRect();
      m.x = event.clientX - rect.left;
      m.y = event.clientY - rect.top;
    }
  }

  $effect(() => {
    window.addEventListener("mousemove", handleMousemove);
    return () => {
      window.removeEventListener("mousemove", handleMousemove);
    };
  });

  // Color stops for spotlight
  const spotlightColorStops = [from, via, to]
    .filter((value) => !!value)
    .join(",");
</script>

{#if !white}
  <svelte:element
    this={as}
    bind:this={card}
    style="
        --x: {m.x}px; 
        --y: {m.y}px; 
        --spotlight-color-stops: {spotlightColorStops}; 
        --spotlight-size: {size}px;"
    class={`relative transform-gpu overflow-hidden ${className} ${
      mode === "before"
        ? "before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
        : "after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]"
    }`}
    {...rest}
  >
    {@render children()}
  </svelte:element>
{:else}
  <svelte:element this={as} bind:this={card} {...rest}>
    <BaseSpotlightCard
      from="rgba(255,255,255,0.2)"
      className={`${className} relative rounded-[${radius}] [--radius:var(--radius-xl)] lg:[--radius:var(--radius-2xl)]`}
    >
      <!-- Border gradient -->
      <div
        class="absolute inset-x-0 bottom-(--radius) top-0 rounded-t-(--radius) bg-linear-to-b from-white/20 to-transparent"
      ></div>

      <!-- Top highlight -->
      <div
        class="absolute inset-x-(--radius) top-0 h-px bg-linear-to-r from-transparent via-white/50 to-transparent"
      ></div>

      <!-- Background -->
      <div
        class="absolute inset-px rounded-[calc(var(--radius)-1px)] bg-zinc-950"
      ></div>

      <!-- Inner light -->
      <div
        class="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]"
      ></div>

      <div class="relative flex h-full flex-col">
        {@render children()}
      </div>
    </BaseSpotlightCard>
  </svelte:element>
{/if}
