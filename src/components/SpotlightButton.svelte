<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    as?: string;
    rounded?: boolean;
    animate?: boolean;
    transparent?: boolean;
    className?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    as = "button",
    rounded = false,
    animate = true,
    transparent = false,
    className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class={`group relative inline-flex items-center overflow-hidden transition ${
    rounded ? "rounded-full" : "rounded-md px-8 py-1"
  } ${transparent ? "" : "bg-zinc-800"} ${className}`}
  {...rest}
>
  {#if animate}
    <div class="absolute inset-0 flex items-center @container">
      <div
        class="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100"
      ></div>
    </div>
  {/if}

  <div
    class={`absolute inset-0.5 bg-zinc-900 sm:bg-zinc-900/80 sm:backdrop-blur-md ${
      transparent ? "" : "bg-zinc-800"
    } ${rounded ? "rounded-full" : "rounded-md"}`}
  ></div>

  <div
    class={`absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100 ${
      rounded ? "rounded-full" : "rounded-md"
    }`}
  ></div>

  {@render children()}
</svelte:element>
